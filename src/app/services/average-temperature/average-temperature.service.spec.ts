import { TestBed } from '@angular/core/testing';
import { AverageTemperatureService } from './average-temperature.service';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { of } from 'rxjs';
import { mockStoredWeatherData } from '../../../assets/mocks/mock-weather-data';

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
    weatherApiServiceSpy.getCurrentForecast.and.returnValue(of(mockStoredWeatherData));

    service.get().subscribe((res) => {
      expect(res).toEqual({
        date: 'FEB 2 - 3 2023',
        temperature: 9,
      });
    });
  });
});
