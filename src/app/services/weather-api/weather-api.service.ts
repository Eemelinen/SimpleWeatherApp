import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AbstractWeatherApiService } from './abstract-weather-api-service';
import { LocationDataModel } from '../../components/location-picker/location-data.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { WeatherApiResponse } from './weather-api-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { defaultWeatherData } from './default-weather-data';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService extends AbstractWeatherApiService {
  private currentForecast$$ = new BehaviorSubject<WeatherApiResponse>({city_name: '', country_code: '', data: []});
  private currentForecast$ = this.currentForecast$$.asObservable();

  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar
  ) {
    super();
  }

  getCurrentForecast(): Observable<WeatherApiResponse> {
    return this.currentForecast$;
  }

  updateWeatherData(location: LocationDataModel, days = 10): void {
    if (!location.city || !location.country) {
      this.currentForecast$$.next(defaultWeatherData);
      return;
    }

    this.http.get<WeatherApiResponse>(
      `${environment.FORECAST_URL_START}?city=${location.city},${location.country}&key=${environment.WEATHER_API_KEY}&days=${days}`)
      .subscribe({
        next: (res: WeatherApiResponse) => this.handleSuccess(res, location),
        error: () => this.handleError()
      });
  }

  private handleSuccess(res: WeatherApiResponse, location: LocationDataModel): void {
    if (
      res
      && res.city_name.toLowerCase() === location.city.toLowerCase()
      && res.country_code.toLowerCase() === location.country.toLowerCase()) {
      this.currentForecast$$.next({city_name: res.city_name, country_code: res.country_code, data: res.data});
    } else {
      this.currentForecast$$.next(defaultWeatherData);
    }
  }

  private handleError(): void {
    this.openSnackbar("Hmm. Something unexpected happened while fetching your weather. Please try again");
    this.currentForecast$$.next(defaultWeatherData);
  }

  private openSnackbar(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
