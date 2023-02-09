import { TestBed } from '@angular/core/testing';
import { NextWeekWeatherService } from './next-week-weather.service';
import { of } from 'rxjs';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { mockStoredWeatherData } from '../../../mocks/mock-weather-data';

describe('NextWeekWeatherService', () => {
  let service: NextWeekWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AbstractWeatherApiService,
          useValue: {
            getCurrentForecast: () => of(mockStoredWeatherData)
          }
        }
      ]
    });
    service = TestBed.inject(NextWeekWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get should return a valid observable array of WeatherCard objects', () => {
    service.get().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data[0].title).toBe('THURSDAY');
      expect(data[0].temperatureValue).toBe(Math.round(mockStoredWeatherData.data[0].temp));
    });
  });
});
