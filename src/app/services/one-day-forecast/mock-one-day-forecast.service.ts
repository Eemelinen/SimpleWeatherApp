import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { AbstractOneDayForecastService } from './abtract-forecast-today.service';
import { mockOneDayForecast } from '../../../assets/mocks/mock-one-day-forecast';

@Injectable({
  providedIn: 'root'
})
export class MockOneDayForecastService extends AbstractOneDayForecastService {

  constructor(protected override apiService: AbstractWeatherApiService) {
    super(apiService);
  }

  /**
   * Returns today's weather by default, or the weather for the given number of days from now
   * Returns emptyOneDayWeather if data is invalid or storage does not contain data
   * @param daysFromNow
   */
  get(daysFromNow: number = 0): Observable<OneDayForecast> {
    return of(mockOneDayForecast);
  }
}
