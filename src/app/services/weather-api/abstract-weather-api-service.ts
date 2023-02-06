import { LocationDataModel } from '../../components/location-picker/location-data.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { WeatherApiResponse } from './weather-api-response';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractWeatherApiService {
  public abstract getCurrentForecast(): Observable<WeatherApiResponse>;
  public abstract updateWeatherData(location: LocationDataModel, days?: number): void;
}
