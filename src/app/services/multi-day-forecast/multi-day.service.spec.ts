import { TestBed } from '@angular/core/testing';
import { MultiDayForecastService } from './multi-day-forecast.service';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { of } from 'rxjs';
import { emptyWeatherData } from '../weather-api/empty-weather-data';
import { emptyMultiDayForecast } from './empty-multi-day-forecast';
import { mockStoredWeatherData } from '../../../assets/mocks/mock-weather-data';

fdescribe('MultiDayForecastService', () => {
  let service: MultiDayForecastService;
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
    service.get().subscribe((res) => {
      console.log(res.dateRange);
      expect(res.dateRange).toEqual('FEB 3 - 3 2023');
    });
  });
});
