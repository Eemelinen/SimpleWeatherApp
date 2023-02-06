/// <reference path="../../types.d.ts" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LocationPickerComponent } from './components/location-picker/location-picker.component';
import { MockComponents } from 'ng-mocks';
import { mockForecasts } from '../mocks/mock-forecasts';
import { AbstractLocationService } from './services/location/abstract-location.service';
import { MockLocationService } from './services/location/mock-location.service';
import { TemperatureCardComponent } from './components/temperature-card/temperature-card.component';
import { of } from 'rxjs';

xdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponents(
          TemperatureCardComponent,
          LocationPickerComponent
        ),
      ],
      providers: [
        {
          provide: AbstractLocationService,
          useClass: MockLocationService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.nextWeekForecast$ = of(mockForecasts);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a section with class location-selection', () => {
    expect(fixture.nativeElement.querySelector('section.location-selection')).toBeTruthy();
  });

  it('Should NOT show average-temperature if NO weather data is available', () => {
    expect(fixture.nativeElement.querySelector('section.average-temperature')).toEqual(null);
  });

  it('should have a section with class average-temperature if weather data is available', () => {
    component.nextWeekForecast$ = of([mockForecasts[0]]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('section.average-temperature')).toBeTruthy();
  });

  it('Should NOT show next-week-temperatures if no weather data is available', () => {
    expect(fixture.nativeElement.querySelector('section.next-week-temperatures')).toEqual(null);
  });

  it('should have a section with class next-week-temperatures if weather data is available', () => {
    component.nextWeekForecast$ = of(mockForecasts);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('section.next-week-temperatures')).toBeTruthy();
  });
});
