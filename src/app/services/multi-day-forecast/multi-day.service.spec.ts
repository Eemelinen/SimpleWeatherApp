import { TestBed } from '@angular/core/testing';
import { MultiDayForecastService } from './multi-day-forecast.service';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { of } from 'rxjs';
import { emptyWeatherData } from '../weather-api/empty-weather-data';
import { emptyMultiDayForecast } from './empty-multi-day-forecast';
import { mockStoredWeatherData } from '../../../assets/mocks/mock-weather-data';
import { DatesToStringService } from '../date-range-formatter/dates-to-string.service';

const formattedDate = 'FEB 3 - 10 2023';

describe('MultiDayForecastService', () => {
  let service: MultiDayForecastService;
  let weatherApiServiceSpy: jasmine.SpyObj<AbstractWeatherApiService>;

  beforeEach(() => {
    weatherApiServiceSpy = jasmine.createSpyObj('AbstractWeatherApiService', ['getCurrentForecast']);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AbstractWeatherApiService,
          useValue: weatherApiServiceSpy
        },
        {
          provide: DatesToStringService,
          useValue: {
            format: () => formattedDate
          }
        }
      ]
    });
    service = TestBed.inject(MultiDayForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get should return an empty multiDayWeatherForecast if receives invalid data from apiService', () => {
    weatherApiServiceSpy.getCurrentForecast.and.returnValue(of(emptyWeatherData));
    service.get().subscribe((res) => {
      expect(res).toEqual(emptyMultiDayForecast);
    });
  });

  it('get should return a multiDayWeatherForecast if receives valid data from apiService', () => {
    weatherApiServiceSpy.getCurrentForecast.and.returnValue(of(mockStoredWeatherData));
    service.get(0).subscribe((res) => {
      expect(res.dateRange).toEqual(formattedDate);
      expect(res.forecasts.length).toEqual(2);
      expect(res.forecasts[0].dayOfWeek).toEqual('Thu');
      expect(res.forecasts[1].dayOfWeek).toEqual('Fri');
      expect(res.forecasts[0].weatherImg).toEqual(mockStoredWeatherData.data[0].weather.icon);
      expect(res.forecasts[1].temperature).toEqual(mockStoredWeatherData.data[1].temp);
    });
  });
});
