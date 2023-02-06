import { TestBed } from '@angular/core/testing';
import { NextWeekWeatherService } from './next-week-weather.service';
import { mockWeatherApiResponse } from '../../../mocks/mock-weather-api-response';
import { of } from 'rxjs';
import { WeatherApiResponse } from '../weather-api/weather-api-response';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';

describe('NextWeekWeatherService', () => {
  let service: NextWeekWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AbstractWeatherApiService,
          useValue: {
            getCurrentForecast: () => of(mockWeatherApiResponse as WeatherApiResponse)
          }
        }
      ]
    });
    service = TestBed.inject(NextWeekWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get should return a valid observable array of WeatherCard objects', (done) => {
    service.get().subscribe((data) => {
      expect(data.length).toBe(7);
      expect(data[0].title).toBe('THURSDAY');
      expect(data[0].temperatureValue).toBe(Math.round(mockWeatherApiResponse.data[0].temp));
      done();
    });
  });
});
