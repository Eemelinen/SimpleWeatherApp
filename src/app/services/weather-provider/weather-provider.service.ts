import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import { AbstractWeatherProviderService } from './abstract-weather-provider.service';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import {WeatherApiData, WeatherApiDataModel} from '../weather-api/weather-api-response';

@Injectable({
  providedIn: 'root'
})
export class WeatherProviderService extends AbstractWeatherProviderService {
  private weatherData$$ = new BehaviorSubject<WeatherData[]>([])
  private weatherData$ = this.weatherData$$.asObservable();

  private loading$$ = new BehaviorSubject<boolean>(false);
  private loading$ = this.loading$$.asObservable();

  constructor(
    protected override http: HttpClient,
    protected override apiService: AbstractWeatherApiService
  ) {
    super(http, apiService);
    this.getWeather({country: "NL", city: "Amsterdam"});
  }

  getLoading(): Observable<boolean> {
    return this.loading$;
  }

  getWeather(location: LocationData): any {
    if (location.city && location.country) {
      this.apiService.getWeatherData({country: "NL", city: "Amsterdam"})
        .pipe(
          tap((res: any) => {
            console.log(res)
          }),
          map((res: any) => {
            console.log('test1')
            return res.data.map((day: any) => {
              return {
                date: day.datetime,
                temp: day.temp
              }
            })
          }),
          map((res: any) => {
            console.log('test2')
            return res;
          })
        ).subscribe((res: any) => {
          console.log(res)
        });


        // .subscribe((res: any) => {
        //   console.log(res)
        //   this.updateWeather(res);
        // });
    }
  }

  updateWeatherForecast(location: LocationData): any {
      // if (location.city && location.country) {
      //   this.apiCall(location);
      // } else {
      //   // this.emptyWeatherData();
      // }
  }

  private updateWeather(res: any) {
    this.weatherData$$.next(res.data.map((day: any) => {
      return {
        date: day.datetime,
        temp: day.temp
      }
    }));
  }

  private emptyWeatherData() {
    this.weatherData$$.next([]);
  }

  private startLoading() {
    this.loading$$.next(true);
  }

  private stopLoading() {
    this.loading$$.next(false);
  }
}
