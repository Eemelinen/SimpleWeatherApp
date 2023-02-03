import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { mockWeatherForecast } from '../../../mocks/mock-weather-forecast';
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
    // this.removePreviousData();
    return this.weatherData$;
  }

  // Make a call to the weather API
  fetchWeatherForecast(country: string, city: string): any {
    // return this.http.get(`http://api.weatherbit.io/v2.0/forecast/daily?city=${city},${country}&key=${environment.WEATHER_API_KEY}&days=10`);
    return mockWeatherForecast;

    //   .subscribe(res => {
    //   this.weatherData$$.next(res.data.map((day: any) => {
    //     return {
    //       date: day.datetime,
    //       temp: day.temp
    //     }
    //   }));
    // });
  }

  // private removePreviousData() {
  //   this.weatherData$$.next([]);
  // }
}
