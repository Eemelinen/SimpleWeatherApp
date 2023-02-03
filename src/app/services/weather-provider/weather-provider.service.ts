import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractWeatherProviderService } from './abstract-weather-provider.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherProviderService extends AbstractWeatherProviderService {
  private weatherData$$ = new BehaviorSubject<WeatherData[]>([])
  public weatherData$ = this.weatherData$$.asObservable();

  constructor(private http: HttpClient) {
    super();
  }

  getWeather(country: string, city: string): Observable<WeatherData[]> {
    // Todo: Handle fetching elsewhere, for example when city service data changes
    this.fetchWeatherForecast(country, city);
    return this.weatherData$;
  }

  fetchWeatherForecast(country: string, city: string): any {
    this.http
      .get(`http://api.weatherbit.io/v2.0/forecast/daily?city=${city},${country}&key=${environment.WEATHER_API_KEY}&days=10`)
      .subscribe((res: any) => {
        this.weatherData$$.next(res.data.map((day: any) => {
          return {
            date: day.datetime,
            temp: day.temp
          }
        }));
      });
  }
}
