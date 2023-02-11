import { TestBed } from '@angular/core/testing';
import { OneDayForecastService } from './one-day-forecast.service';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { of } from 'rxjs';
import { mockStoredWeatherData } from '../../../mocks/mock-weather-data';
import { emptyWeatherData } from '../weather-api/empty-weather-data';
import {emptyOneDayForecast} from './empty-one-day-forecast';

describe('OneDayForecastService', () => {
  let service: OneDayForecastService;
  let weatherApiServiceSpy: jasmine.SpyObj<AbstractWeatherApiService>;

  beforeEach(() => {
    weatherApiServiceSpy = jasmine.createSpyObj('AbstractWeatherApiService', ['getCurrentForecast']);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AbstractWeatherApiService,
          useValue: weatherApiServiceSpy
        }
      ]
    });
    service = TestBed.inject(OneDayForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a weather data object with only current day data', () => {
    const expectedResult = JSON.parse(JSON.stringify(mockStoredWeatherData));
    const weatherData = expectedResult.data[0];
    expectedResult.data = [weatherData];

    weatherApiServiceSpy.getCurrentForecast.and.returnValue(of(mockStoredWeatherData));
    service.get().subscribe((res) => {
      expect(res).toEqual(expectedResult);
      expect(res.city_name).toEqual(mockStoredWeatherData.city_name);
      expect(res.temperature).toEqual(mockStoredWeatherData.data[0].temp);
    });
  });

  it('shoud return empty weather data object if the weather data is invalid', () => {
    const weatherDataCopy = JSON.parse(JSON.stringify(mockStoredWeatherData));
    weatherDataCopy.data = [];

    weatherApiServiceSpy.getCurrentForecast.and.returnValue(of(weatherDataCopy));
    service.get().subscribe((res) => {
      expect(res).toEqual(emptyOneDayForecast);
    });
  });
});
