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

  // Todo: should not need a locationData parameter here
  public abstract getWeatherData(locationData: LocationDataModel): Observable<WeatherApiData | null>;

  public abstract updateWeatherData(locationData: LocationDataModel): Observable<WeatherApiData | null>;
}
