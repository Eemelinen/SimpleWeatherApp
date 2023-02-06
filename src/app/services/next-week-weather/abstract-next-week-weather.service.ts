import { Injectable } from '@angular/core';
import { AbstractWeatherWidgetService } from '../abstract-weather-widget.service';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractNextWeekWeatherService extends AbstractWeatherWidgetService {

  constructor(protected override apiService: AbstractWeatherApiService) {
    super(apiService);
  }

  public abstract get(): Observable<WeatherCardData[]>
}
