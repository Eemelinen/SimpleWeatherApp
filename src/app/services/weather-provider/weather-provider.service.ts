import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractWeatherProviderService } from './abstract-weather-provider.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';

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
    // private snackbar: MatSnackBar,
    protected override weatherData: AbstractWeatherApiService
  ) {
    super(http, weatherData);
    this.weatherData.getWeatherData({country: "NL", city: "Amsterdam"}).subscribe((res: any) => {
      this.updateWeather(res);
    });
  }

  getLoading(): Observable<boolean> {
    return this.loading$;
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
    this.startLoading();
    this.http
      .get(`${environment.FORECAST_URL_START}?city=${location.city},${location.country}&key=${environment.WEATHER_API_KEY}&days=10`)
      .subscribe({
        // next: (res: any) => this.apiCallSucceeded(res, location),
        // error: () => this.apiCallFailed(),
        // complete: () => this.stopLoading()
      });
  }
  //
  // private apiCallFailed() {
  //   // todo: Snackbar for unexpected error
  //   this.emptyWeatherData();
  //   this.stopLoading();
  //   this.openSnackbar("Sorry, something unexpected happened!");
  // }
  //
  // private apiCallSucceeded(res: any, location: LocationData) {
  //   if (res && res.data && res.city_name.toLowerCase() === location.city.toLowerCase()) {
  //     this.updateWeather(res);
  //   } else {
  //     this.emptyWeatherData();
  //   }
  // }
  //
  // private openSnackbar(message: string): void {
  //   this.snackbar.open(message, 'Close', {
  //     duration: 1000,
  //   });
  // }

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
