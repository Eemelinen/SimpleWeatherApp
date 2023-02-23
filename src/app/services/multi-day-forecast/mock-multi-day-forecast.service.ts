import { Injectable } from '@angular/core';
import { AbstractMultiDayForecastService } from './abstract-multi-day-forecast.service';
import { Observable, of } from 'rxjs';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { mockMultiDayForecast } from '../../../assets/mocks/mock-multi-day-forecast';

@Injectable({
  providedIn: 'root'
})
export class MockMultiDayForecastService extends AbstractMultiDayForecastService {

  constructor(
    protected override apiService: AbstractWeatherApiService,
  ) {
    super(apiService);
  }

  get(startDay = 1, endDay = 8): Observable<MultiDayWeatherForecast> {
    return of(mockMultiDayForecast);
  }
}
