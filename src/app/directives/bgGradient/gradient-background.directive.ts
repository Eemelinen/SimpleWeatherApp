import { Directive, ElementRef, OnInit, OnDestroy, Renderer2, Input } from '@angular/core';
import { timer, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * A `RGBValue` containers the RGB values for a step in the gradient animation
 */
export type RGBValue = [number, number, number];

export type RGBTransition = [string, string, string];

export enum InterpolationDirection {
  FORWARD,
  BACKWARD
}

@Directive({
  selector: '[gradientBackground]'
})
export class GradientBackgroundDirective implements OnInit, OnDestroy {
  /**
   * A list of RGB Value tuples used to define the gradient
   */
  @Input()
  colors: RGBValue[] = [[16, 47, 126], [14,106, 181], [12, 141, 214], [26, 160, 236], [96, 198, 255], [155, 219, 255], [180, 222, 218], [255, 214, 107], [255, 193, 120], [254, 146, 85]];

  /**
   * The tick speed for calling the update of the gradient
   */
  @Input()
  private tickSpeed = 16;

  /**
   * The multiplier for the gradient speed
   */
  @Input()
  gradientSpeed = 0.0025;

  private direction = InterpolationDirection.FORWARD;
  private step$ = new BehaviorSubject<number>(0);
  private componentDestroyed$ = new Subject<boolean>();
  private gradientRunning$ = new BehaviorSubject<boolean>(true);
  private endColorIndex: number = 7;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    combineLatest([timer(0, this.tickSpeed), this.gradientRunning$])
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(([_, gradientRunning]) => {
        if (gradientRunning) {
          let result =
            this.direction === InterpolationDirection.FORWARD
              ? this.step$.value + this.gradientSpeed
              : this.step$.value - this.gradientSpeed;

          if (result >= 1) {
            this.direction = InterpolationDirection.BACKWARD;
            result = 1;
          } else if (result <= 0) {
            this.direction = InterpolationDirection.FORWARD;
            result = 0;
          }
          this.step$.next(result);
        }
      });

    /**
     * Combine the timer and gradient running to trigger rendering
     */
    combineLatest([this.step$, this.gradientRunning$])
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(([step, gradientRunning]) => gradientRunning && this.render(this.generateColour(step)));
  }

  ngOnDestroy() {
    this.gradientRunning$.next(false);
    this.componentDestroyed$.next(true);

    this.gradientRunning$.complete();
    this.componentDestroyed$.complete();
  }

  /**
   * Update the gradient animation
   */
  public render(renderValue: RGBTransition) {
    this.renderer.setStyle(
      this.el.nativeElement,
      'background',
      `linear-gradient(60deg, ${renderValue[0]} 0%, ${renderValue[1]} 50%, ${renderValue[2]} 100%)`
    );
  }

  /**
   * Change the endpoint color, which defines rest of the gradient
   */
  public changeEndpointColor(averageTemperature: number): number {
    return this.endColorIndex = this.translateTemperatureToColorIndex(averageTemperature);
  }

  /**
   * Start the directive gradient animation
   */
  public start(): void {
    this.gradientRunning$.next(true);
  }

  /**
   * Stop the directive gradient animation
   */
  public stop(): void {
    this.gradientRunning$.next(false);
  }

  private createColor(index: number, step: number, value1: RGBValue, value2: RGBValue) {
    const red = Math.round(index * value1[0] + step * value2[0]);
    const green = Math.round(index * value1[1] + step * value2[1]);
    const blue = Math.round(index * value1[2] + step * value2[2]);
    return `rgb(${red}, ${green}, ${blue})`;
  }

  /**
    * Get the color index based on given amount of steps down from the end color
   */
  private getColorIndex(numOfStepsDown: number) {
    const number = this.endColorIndex - numOfStepsDown;
    if (number < 0) {
      return 0;
    }
    return number;
  }

  /**
   * Colors are generated for the gradient animation based on
   */
  private generateColour(step: number): RGBTransition {
    const stepIndex = 1 - step;

    const color1 = this.createColor(
      stepIndex,
      step,
      this.colors[this.getColorIndex(5)],
      this.colors[this.getColorIndex(4)]
    );
    const color2 = this.createColor(
      stepIndex,
      step,
      this.colors[this.getColorIndex(3)],
      this.colors[this.getColorIndex(2)]
    );
    const color3 = this.createColor(
      stepIndex,
      step,
      this.colors[this.getColorIndex(1)],
      this.colors[this.endColorIndex]
    );

    return [color1, color2, color3];
  }

  private translateTemperatureToColorIndex(averageTemperature: number): number {
    switch (true) {
      case averageTemperature <= -40:
        return 0;
      case averageTemperature < -33:
        return 1;
      case averageTemperature < -30:
        return 2;
      case averageTemperature < -20:
        return 3;
      case averageTemperature < -10:
        return 4;
      case averageTemperature < 0:
        return 5;
      case averageTemperature < 10:
        return 6;
      case averageTemperature < 20:
        return 7;
      case averageTemperature < 30:
        return 8;
      case averageTemperature >= 30:
        return 9;
      default:
        return 6;
    }
  }
}
