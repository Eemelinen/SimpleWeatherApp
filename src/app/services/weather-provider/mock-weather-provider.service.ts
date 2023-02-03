import { Injectable } from '@angular/core';
import { AbstractWeatherProviderService } from './abstract-weather-provider.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { mockForecasts } from '../../../mocks/mock-forecasts';

@Injectable({
  providedIn: 'root'
})
export class MockWeatherProviderService extends AbstractWeatherProviderService {
  private weatherData$$ = new BehaviorSubject<WeatherData[]>([])
  private weatherData$ = this.weatherData$$.asObservable();

  constructor() {
    super();
  }

  getWeather(): Observable<WeatherData[]> {
    return this.weatherData$;
  }

  updateWeatherForecast(location: LocationData): void {
    if (location.city && location.country) {
      this.weatherData$$.next(mockForecasts);
    } else {
      this.weatherData$$.next([]);
    }
  }
}
