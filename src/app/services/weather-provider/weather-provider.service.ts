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
  private weatherData$ = this.weatherData$$.asObservable();

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  getWeather(): Observable<WeatherData[]> {
    return this.weatherData$;
  }

  updateWeatherForecast(location: LocationData): any {
      if (location.city && location.country) {
        this.apiCall(location);
      } else {
        this.emptyWeatherData();
      }
  }

  private updateWeather(res: any) {
    this.weatherData$$.next(res.data.map((day: any) => {
      return {
        date: day.datetime,
        temp: day.temp
      }
    }));
  }

  private apiCall(location: LocationData) {
    this.http
      .get(`http://api.weatherbit.io/v2.0/forecast/daily?city=${location.city},${location.country}&key=${environment.WEATHER_API_KEY}&days=10`)
      .subscribe((res: any) => {
        if (res.data && res.city_name === location.city) {
          this.updateWeather(res);
        } else {
          this.emptyWeatherData();
        }
      });
  }

  private emptyWeatherData() {
    this.weatherData$$.next([]);
  }
}
