import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AbstractWeatherApiService } from './abstract-weather-api-service';
import { LocationDataModel } from '../../components/location-picker/location-data.model';
import { catchError, map, Observable, of } from 'rxjs';
import { WeatherApiData, WeatherApiDataModel } from './weather-api-response';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService extends AbstractWeatherApiService {

  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar
  ) {
    super();
  }

  getWeatherData(location: LocationDataModel): Observable<WeatherApiData | []> {
    return this.http
      .get<WeatherApiData>(`${environment.FORECAST_URL_START}?city=${location.city},${location.country}&key=${environment.WEATHER_API_KEY}&days=10`)
      .pipe(
        map((res: WeatherApiData) => new WeatherApiDataModel(res.city_name, res.country_code, res.data)),
        catchError(() => this.apiCallFailed())
      )
  }


  private apiCallFailed(): Observable<[]> {
    this.openSnackbar("Sorry. Something unexpected happened.");
    return of([]);
  }

  private openSnackbar(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 1000,
    });
  }
}
