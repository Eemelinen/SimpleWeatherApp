import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { mockWeatherObservable } from '../../../mocks/mock-weather-observable';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherProviderService {
  private weatherData$$ = new BehaviorSubject<any>([])
  weatherData$ = this.weatherData$$.asObservable();

  constructor(private http: HttpClient) {
  }

  // Make a call to the weather API
  fetchWeatherForecast(country: string, city: string) {
    // return this.http.get(`http://api.weatherbit.io/v2.0/forecast/daily?city=${city},${country}&key=${environment.WEATHER_API_KEY}&days=10`);
    return mockWeatherObservable;
  }

  private removePreviousData() {
    this.weatherData$$.next([]);
  }

  private calculateAverageTemperature(data: any) {
    let total = 0;
    let count = 0;
    data.data.forEach((day: any) => {
      total += day.temp;
      count++;
    });
    return total / count;
  }

}
