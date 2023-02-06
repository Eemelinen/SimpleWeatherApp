import { LocationDataModel } from '../../components/location-picker/location-data.model';
import { Observable } from 'rxjs';
import { WeatherApiData } from './weather-api-response';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractWeatherApiService {

  getCurrentForecast(): Observable<WeatherApiData> {
    return new Observable<WeatherApiData>();
  }

  public abstract updateWeatherData(location: LocationDataModel): void;
}
