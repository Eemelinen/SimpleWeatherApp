import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractAverageTemperatureService {

  constructor(protected apiService: AbstractWeatherApiService) {}
  public abstract get(): Observable<WeatherCardData>

}
