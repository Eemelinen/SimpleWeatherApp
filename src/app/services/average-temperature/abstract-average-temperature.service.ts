import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { AbstractWeatherWidgetService } from '../abstract-weather-widget.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractAverageTemperatureService extends AbstractWeatherWidgetService {

  constructor(protected override apiService: AbstractWeatherApiService) {
    super(apiService);
  }
  public abstract get(): Observable<WeatherCardData>

}