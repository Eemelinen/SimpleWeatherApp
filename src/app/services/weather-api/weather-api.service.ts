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

  getWeatherData(location: LocationDataModel): Observable<WeatherApiData | null> {
    return this.http
      .get<WeatherApiData>(`${environment.FORECAST_URL_START}?city=${location.city},${location.country}&key=${environment.WEATHER_API_KEY}&days=10`)
      .pipe(
        map((res: WeatherApiData) => {
          return new WeatherApiDataModel(res?.city_name ?? '', res?.country_code ?? '', res?.data ?? []);
        }),
        catchError(() => this.apiCallFailed())
      );
  }

  private apiCallFailed(): Observable<null> {
    this.openSnackbar("Sorry. Something unexpected happened.");
    return of(null);
  }

  private openSnackbar(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
