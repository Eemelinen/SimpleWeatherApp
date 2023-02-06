import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AbstractWeatherApiService } from './abstract-weather-api-service';
import { LocationDataModel } from '../../components/location-picker/location-data.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { WeatherApiData, WeatherApiDataModel, WeatherApiResponse } from './weather-api-response';
import { MatSnackBar } from '@angular/material/snack-bar';

const defaultWeatherData: WeatherApiDataModel = {
  city_name: '',
  country_code: '',
  data: []
}

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService extends AbstractWeatherApiService {
  private currentForecast$$ = new BehaviorSubject<WeatherApiDataModel>({city_name: '', country_code: '', data: []});
  private currentForecast$ = this.currentForecast$$.asObservable();

  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar
  ) {
    super();
  }

  getCurrentForecast(): Observable<WeatherApiData> {
    return this.currentForecast$;
  }

  updateWeatherData(location: LocationDataModel, days = 10): void {
    if (!location.city || !location.country) {
      this.currentForecast$$.next(defaultWeatherData);
      return;
    }

    this.http.get<WeatherApiResponse>(`${environment.FORECAST_URL_START}?city=${location.city},${location.country}&key=${environment.WEATHER_API_KEY}&days=${days}`)
      .subscribe({
        next: (res: WeatherApiResponse) => this.handleSuccess(res, location),
        error: (err: any) => this.handleError(err)
      });
  }

  private handleSuccess(res: WeatherApiResponse, location: LocationDataModel) {
    if (res && res.city_name.toLowerCase() === location.city.toLowerCase() && res.country_code.toLowerCase() === location.country.toLowerCase()) {
      this.currentForecast$$.next(new WeatherApiDataModel(res.city_name, res.country_code, res.data));
    } else {
      this.currentForecast$$.next(defaultWeatherData);
    }
  }

  private handleError(err: any) {
    this.openSnackbar("Hmm. Something unexpected happened while fetching your weather. Please try again");
    this.currentForecast$$.next(defaultWeatherData);
  }

  private openSnackbar(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
