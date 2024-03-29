import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractWeatherApiService } from './abstract-weather-api-service';
import { LocationDataModel } from '../../components/location-picker/location-data.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { WeatherApiResponse } from './weather-api-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emptyWeatherData } from './empty-weather-data';
import { StoredWeatherData } from './weather-data.model';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService extends AbstractWeatherApiService {
  private currentForecast$$ = new BehaviorSubject<StoredWeatherData>({city_name: '', country_code: '', data: []});
  private currentForecast$ = this.currentForecast$$.asObservable();

  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private environment: EnvironmentService
  ) {
    super();
  }

  getCurrentForecast(): Observable<StoredWeatherData> {
    return this.currentForecast$;
  }

  updateWeatherData(location: LocationDataModel, days = 10): void {
    if (!location.city || !location.country) {
      this.currentForecast$$.next(emptyWeatherData);
      return;
    }

    this.http.get<WeatherApiResponse>(
      `${this.environment.forecast_url_start}?city=${location.city},${location.country}&key=${this.environment.weather_api_key}&days=${days}`)
      .subscribe({
        next: (res: WeatherApiResponse) => this.handleSuccess(res, location),
        error: () => this.handleError()
      });
  }

  private handleSuccess(res: WeatherApiResponse, location: LocationDataModel): void {
    if (!this.responseHasNeededData(res) || !this.queryArgsMatchResponse(location, res)) {
      this.currentForecast$$.next(emptyWeatherData);
      this.snackbar.open(
        "Sorry. Couldn't find the location you entered.",
        'Close',
        { duration: 3000 }
      );
      return;
    }

    try {
      const parsedData = StoredWeatherData.parseData(res.data);
      this.currentForecast$$.next({city_name: res.city_name, country_code: res.country_code, data: parsedData});
    } catch(e) {
      this.handleError();
    }
  }

  private handleError(): void {
    this.snackbar.open(
      'Sorry, we encountered an unexpected error while trying to retrieve the weather information. Please try again later.',
      'Close',
      { duration: 3000 }
    );
    this.currentForecast$$.next(emptyWeatherData);
  }

  private responseHasNeededData(res: WeatherApiResponse): boolean {
    return !!(
      res &&
      res.city_name &&
      res.country_code &&
      res.data &&
      res.data.length > 0
    );
  }

  private queryArgsMatchResponse(location: LocationDataModel, res: WeatherApiResponse): boolean {
    return (
      location.city.toLowerCase() === res.city_name.toLowerCase() &&
      location.country.toLowerCase() === res.country_code.toLowerCase()
    );
  }
}
