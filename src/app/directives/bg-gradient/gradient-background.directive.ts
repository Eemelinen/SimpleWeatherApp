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
  selector: '[ngxAnimatedGradient]'
})
export class GradientBackgroundDirective implements OnInit, OnDestroy {
  /**
   * A list of RGB Value tuples used to define the gradient
   */
  @Input()
  colors: RGBValue[] = [[16, 47, 126], [12, 141, 214], [26, 160, 236], [96, 198, 255], [155, 219, 255], [180, 222, 218], [255, 214, 107], [255, 193, 120], [254, 146, 85]];
  // colors: RGBValue[] = [[62, 35, 255], [60, 255, 60], [255, 35, 98], [45, 175, 230], [255, 0, 255], [255, 128, 0]];

  /**
   * The tick speed for calling the update of the gradient
   */
  @Input()
  tickSpeed = 16;

  /**
   * The multiplier for the gradient speed
   */
  @Input()
  // gradientSpeed = 0.000;
  gradientSpeed = 0.02;
  // gradientSpeed = 0.002;

  private direction = InterpolationDirection.FORWARD;

  private step$ = new BehaviorSubject<number>(0);

  private componentDestroyed$ = new Subject<boolean>();

  private gradientRunning$ = new BehaviorSubject<boolean>(true);

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  private endColorIndex: number = 7;

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
      .subscribe(([step, gradientRunning]) => gradientRunning && this.render(this.generateColour(step), step));
  }

  ngOnDestroy() {
    this.gradientRunning$.next(false);
    this.componentDestroyed$.next(true);

    this.gradientRunning$.complete();
    this.componentDestroyed$.complete();
  }

  private createColor(index: number, step: number, value1: RGBValue, value2: RGBValue) {
    const red = Math.round(index * value1[0] + step * value2[0]);
    const green = Math.round(index * value1[1] + step * value2[1]);
    const blue = Math.round(index * value1[2] + step * value2[2]);
    return `rgb(${red}, ${green}, ${blue})`;
  }

  private getColorIndex(numOfStepsDown: number) {
    const number = this.endColorIndex - numOfStepsDown;
    if (number < 0) {
      return 0;
    }
    return number;
  }

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

  public changeEndpointColor(index: number) {
    return this.endColorIndex = index;
  }

  /**
   * Update the gradient animation
   */
  public render(renderValue: RGBTransition, step: number) {

    this.renderer.setStyle(
      this.el.nativeElement,
      'background',
      `linear-gradient(150deg, ${renderValue[0]} 0%, ${renderValue[1]} 50%, ${renderValue[2]} 100%)`
    );
  }
}
