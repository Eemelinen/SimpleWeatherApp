import { LocationDataModel } from '../../components/location-picker/location-data.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { WeatherApiResponse } from './weather-api-response';
import {WeatherApiData} from './weather-data.model';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractWeatherApiService {
  public abstract getCurrentForecast(): Observable<WeatherApiData>;
  public abstract updateWeatherData(location: LocationDataModel, days?: number): void;
}
