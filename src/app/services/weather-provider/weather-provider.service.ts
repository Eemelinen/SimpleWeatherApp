import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {mockWeatherObservable} from '../../../mocks/mock-weather-observable';

@Injectable({
  providedIn: 'root'
})
export class WeatherProviderService {

  constructor(private http: HttpClient) {
  }

  // Make a call to the weather API
  getTenDaysOfWeather(country: string, city: string) {
    // return this.http.get(`http://api.weatherbit.io/v2.0/forecast/daily?city=${city},${country}&key=${environment.WEATHER_API_KEY}&days=10`);
    return mockWeatherObservable;
  }

}
