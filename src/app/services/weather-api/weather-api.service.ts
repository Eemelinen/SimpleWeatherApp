import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AbstractWeatherApiService } from './abstract-weather-api-service';
import { LocationDataModel } from '../../components/location-picker/location-data.model';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import {WeatherApiData, WeatherApiDataModel, WeatherApiResponse} from './weather-api-response';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService extends AbstractWeatherApiService {
  // private weatherData$$ = new BehaviorSubject<any>([])
  // private weatherData$ = this.weatherData$$.asObservable();

  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar
  ) {
    super();
  }

  // getWeatherData(): Observable<WeatherApiResponse> {
  //   return this.weatherData$;
  // }

  getWeatherData(location: LocationDataModel): Observable<WeatherApiData | []> {
    // this.startLoading();
    return this.http
      .get<WeatherApiData>(`${environment.FORECAST_URL_START}?city=${location.city},${location.country}&key=${environment.WEATHER_API_KEY}&days=10`)
      .pipe(
        map((res: WeatherApiData) => {
          return new WeatherApiDataModel(res.city_name, res.country_code, res.data)
        }),
        catchError(() => this.apiCallFailed())
      )
  }


  private apiCallFailed(): Observable<[]> {
    // todo: Snackbar for unexpected error
    // this.emptyWeatherData();
    // this.stopLoading();
    this.openSnackbar("Sorry. Something unexpected happened.");
    return of([]);
  }

  private openSnackbar(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 1000,
    });
  }

  // private apiCallSucceeded(res: WeatherApiResponse, location: LocationData) {
  //   if (res && res.data && res.city_name.toLowerCase() === location.city.toLowerCase()) {
  //     this.updateWeather(res);
  //   } else {
  //     this.emptyWeatherData();
  //   }
  // }
  //
  // private updateWeather(res: any) {
  //   this.weatherData$$.next(res.data.map((day: any) => {
  //     return {
  //       date: day.datetime,
  //       temp: day.temp
  //     }
  //   }));
  // }
  //
  // private emptyWeatherData() {
  //   this.weatherData$$.next([]);
  // }

  // private startLoading() {
  //   this.loading$$.next(true);
  // }
  //
  // private stopLoading() {
  //   this.loading$$.next(false);
  // }

}
