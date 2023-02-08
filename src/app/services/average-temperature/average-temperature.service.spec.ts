import { TestBed } from '@angular/core/testing';
import { AverageTemperatureService } from './average-temperature.service';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { of } from 'rxjs';
import { mockWeatherApiResponse } from '../../../mocks/mock-weather-api-response';

describe('AverageTemperatureService', () => {
  let service: AverageTemperatureService;
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
    service = TestBed.inject(AverageTemperatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get method should return a valid weatherCardData observable', () => {
    weatherApiServiceSpy.getCurrentForecast.and.returnValue(of(mockWeatherApiResponse));

    service.get().subscribe((res) => {
      expect(res).toEqual({
        title: 'FEB 2 - 11 2023',
        temperatureValue: 4,
      });
    });
  });
});
