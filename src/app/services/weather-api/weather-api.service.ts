import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AbstractWeatherApiService } from './abstract-weather-api-service';
import { LocationDataModel } from '../../components/location-picker/location-data.model';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { WeatherApiData, WeatherApiDataModel, WeatherApiResponse } from './weather-api-response';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  // Todo: change naming in abstract
  override getCurrentForecast(): Observable<WeatherApiData> {
    return this.currentForecast$;
  }

  updateWeatherData(location: LocationDataModel): void {
    this.http.get<WeatherApiResponse>(`${environment.FORECAST_URL_START}?city=${location.city},${location.country}&key=${environment.WEATHER_API_KEY}&days=10`).subscribe((res: any) => {
      if (res) {
        if (res.city_name.toLowerCase() === location.city.toLowerCase() && res.country_code.toLowerCase() === location.country.toLowerCase()) {
          this.currentForecast$$.next(new WeatherApiDataModel(res.city_name, res.country_code, res.data));
        } else {
          this.currentForecast$$.next(new WeatherApiDataModel('', '', []));
        }
      }
    });

  // // getWeatherData(location: LocationDataModel): Observable<WeatherApiData | null> {
  // public getWeatherData(location: LocationDataModel): void {
  //   this.http.get<WeatherApiResponse>(`${environment.FORECAST_URL_START}?city=${location.city},${location.country}&key=${environment.WEATHER_API_KEY}&days=10`).subscribe((res: any) => {
  //     if (res) {
  //       if (res.city_name.toLowerCase() === location.city.toLowerCase() && res.country_code.toLowerCase() === location.country.toLowerCase()) {
  //         this.currentForecast$$.next(new WeatherApiDataModel(res.city_name, res.country_code, res.data));
  //       } else {
  //         this.currentForecast$$.next(new WeatherApiDataModel('', '', []));
  //       }
  //     }
  //   });

      // .pipe(
      //   tap((res: any) => {
      //     if (res) {
      //       if (res.city_name.toLowerCase() === location.city.toLowerCase() && res.country_code.toLowerCase() === location.country.toLowerCase()) {
      //         this.currentForecast$$.next(new WeatherApiDataModel(res.city_name, res.country_code, res.data));
      //       } else {
      //         this.currentForecast$$.next(new WeatherApiDataModel('', '', []));
      //       }
      //     }
      //   }),
      //   map((res: WeatherApiResponse) => {
      //     console.log(res)
      //     return new WeatherApiDataModel(
      //       res?.city_name ?? '',
      //       res?.country_code ?? '',
      //       res?.data ?? []);
      //   }),
      //   catchError(() => this.apiCallFailed())
      // );
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
