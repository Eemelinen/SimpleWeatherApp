/// <reference path="../../types.d.ts" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DailyTemperatureCardComponent } from './components/daily-temperature-card/daily-temperature-card.component';
import {
  AverageTemperatureCardComponent
} from './components/average-temperature-card/average-temperature-card.component';
import { LocationPickerFormComponent } from './components/location-picker-form/location-picker-form.component';
import { MockComponents } from 'ng-mocks';
import {mockWeatherData} from '../mocks/mock-weather-data';
import {mockWeatherForecast} from '../mocks/mock-weather-forecast';
import {mockForecasts} from '../mocks/mock-forecasts';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponents(
          DailyTemperatureCardComponent,
          AverageTemperatureCardComponent,
          LocationPickerFormComponent
        ),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.forecasts = [];
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a section with class location-selection', () => {
    expect(fixture.nativeElement.querySelector('section.location-selection')).toBeTruthy();
  });

  it('Should NOT show average-temperature if no weather data is available', () => {
    expect(fixture.nativeElement.querySelector('section.average-temperature')).toEqual(null);
  });

  it('should have a section with class average-temperature if weather data is available', () => {
    component.forecasts = mockForecasts;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('section.average-temperature')).toBeTruthy();
  });

  it('Should NOT show next-week-temperatures if no weather data is available', () => {
    expect(fixture.nativeElement.querySelector('section.next-week-temperatures')).toEqual(null);
  });

  it('should have a section with class next-week-temperatures if weather data is available', () => {
    component.forecasts = mockForecasts;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('section.next-week-temperatures')).toBeTruthy();
  });
});
