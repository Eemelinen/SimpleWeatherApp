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
import { AbstractAverageTemperatureService } from './services/average-temperature/abstract-average-temperature.service';
import { AbstractNextWeekWeatherService } from './services/next-week-weather/abstract-next-week-weather.service';
import { WeatherTodayComponent } from './components/weather-today/weather-today.component';
import {NextWeekComponent} from './components/next-week/next-week.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponents(
          LocationPickerComponent,
          WeatherTodayComponent,
          NextWeekComponent
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
    expect(compiled.querySelector('app-weather-today')).toBeTruthy();
  });
});
