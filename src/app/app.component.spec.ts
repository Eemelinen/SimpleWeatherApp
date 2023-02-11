/// <reference path="../../types.d.ts" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LocationPickerComponent } from './components/location-picker/location-picker.component';
import { MockComponents } from 'ng-mocks';
import { mockForecasts } from '../mocks/mock-forecasts';
import { AbstractLocationService } from './services/location/abstract-location.service';
import { MockLocationService } from './services/location/mock-location.service';
import { SmallWeatherCardComponent } from './components/small-weather-card/small-weather-card.component';
import { of } from 'rxjs';
import { AbstractAverageTemperatureService } from './services/average-temperature/abstract-average-temperature.service';
import { AbstractNextWeekWeatherService } from './services/next-week-weather/abstract-next-week-weather.service';
import { OneDayWeatherComponent } from './components/one-day-weather/one-day-weather.component';
import {MultiDayForecastComponent} from './components/multi-day-forecast/multi-day-forecast.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponents(
          LocationPickerComponent,
          OneDayWeatherComponent,
          MultiDayForecastComponent
        ),
      ],
      providers: [
        {
          provide: AbstractLocationService,
          useClass: MockLocationService
        },
        {
          provide: AbstractAverageTemperatureService,
          useValue: {
            get: () => of(mockForecasts[0])
          }
        },
        {
          provide: AbstractNextWeekWeatherService,
          useValue: {
            get: () => {
              return of(mockForecasts)
            }
          }
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render a app-weather-today component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('one-day-weather')).toBeTruthy();
  });
});
