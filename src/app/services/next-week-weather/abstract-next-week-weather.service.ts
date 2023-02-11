import { Injectable } from '@angular/core';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractNextWeekWeatherService {

  constructor(protected apiService: AbstractWeatherApiService) {
  }

  public abstract get(): Observable<WeatherCardData[]>
}
