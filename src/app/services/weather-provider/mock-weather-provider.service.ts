import { Injectable } from '@angular/core';
import { AbstractWeatherProviderService } from './abstract-weather-provider.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { mockForecasts } from '../../../mocks/mock-forecasts';

@Injectable({
  providedIn: 'root'
})
export class MockWeatherProviderService extends AbstractWeatherProviderService {

  private weatherData$$ = new BehaviorSubject<WeatherData[]>([])
  public weatherData$ = this.weatherData$$.asObservable();

  constructor() {
    super();
  }

  getWeather(country: string, city: string): Observable<WeatherData[]> {
    // Todo: Handle fetching elsewhere, for example when city service data changes
    this.fetchWeatherForecast(country, city);
    return this.weatherData$;
  }

  fetchWeatherForecast(country: string, city: string): any {
    return this.weatherData$$.next(mockForecasts);
  }
}
