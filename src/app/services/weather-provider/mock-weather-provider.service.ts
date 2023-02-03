import { Injectable } from '@angular/core';
import { AbstractWeatherProviderService } from './abstract-weather-provider.service';
import { Observable, of } from 'rxjs';
import { mockForecasts } from '../../../mocks/mock-forecasts';

@Injectable({
  providedIn: 'root'
})
export class MockWeatherProviderService extends AbstractWeatherProviderService {

  constructor() {
    super();
  }

  getWeather(country: string, city: string): Observable<WeatherData[]> {
    return of(mockForecasts)
  }

  fetchWeatherForecast(country: string, city: string): Observable<any> {
    return of(mockForecasts);
  }
}
