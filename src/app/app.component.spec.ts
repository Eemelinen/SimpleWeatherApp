/// <reference path="../../types.d.ts" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DailyTemperatureCardComponent } from './components/daily-temperature-card/daily-temperature-card.component';
import { LocationPickerFormComponent } from './components/location-picker-form/location-picker-form.component';
import {
  AverageTemperatureCardComponent
} from './components/average-temperature-card/average-temperature-card.component';
import { MockComponents } from 'ng-mocks';
import { mockForecasts } from '../mocks/mock-forecasts';
import { AbstractWeatherProviderService } from './services/weather-provider/abstract-weather-provider.service';
import { MockWeatherProviderService } from './services/weather-provider/mock-weather-provider.service';
import { of } from 'rxjs';
import { AbstractLocationService } from './services/location/abstract-location.service';
import { MockLocationService } from './services/location/mock-location.service';

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
      providers: [
        {
          provide: AbstractWeatherProviderService,
          useClass: MockWeatherProviderService
        },
        {
          provide: AbstractLocationService,
          useClass: MockLocationService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.forecasts$ = of([]);
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
    component.forecasts$ = of(mockForecasts);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('section.average-temperature')).toBeTruthy();
  });

  it('Should NOT show next-week-temperatures if no weather data is available', () => {
    expect(fixture.nativeElement.querySelector('section.next-week-temperatures')).toEqual(null);
  });

  it('should have a section with class next-week-temperatures if weather data is available', () => {
    component.forecasts$ = of(mockForecasts);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('section.next-week-temperatures')).toBeTruthy();
  });
});
