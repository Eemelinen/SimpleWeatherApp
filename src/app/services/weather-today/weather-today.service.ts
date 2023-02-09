import { Injectable } from '@angular/core';
import { AbstractWeatherTodayService } from './abtract-weather-today.service';
import { map, Observable } from 'rxjs';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { WeatherApiData} from '../weather-api/weather-data.model';
import { emptyWeatherData } from '../weather-api/empty-weather-data';

@Injectable({
  providedIn: 'root'
})
export class WeatherTodayService extends AbstractWeatherTodayService {

  constructor(protected override apiService: AbstractWeatherApiService) {
    super(apiService);
  }

  get(): Observable<WeatherApiData> {
    return this.apiService.getCurrentForecast().pipe(
      map((forecast: WeatherApiData) => {
        if (!WeatherApiData.isValid(forecast)) {
          return emptyWeatherData;
        }
        const currentDay = forecast.data[0];
        const forecastCopy = JSON.parse(JSON.stringify(forecast));
        forecastCopy.data = [currentDay];

        return forecastCopy;
      })
    );
  }
}
