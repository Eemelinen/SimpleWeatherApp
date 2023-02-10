import { WeatherApiData } from '../weather-api/weather-data.model';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';

@Injectable()
export class AverageHumidityService {

  constructor(protected apiService: AbstractWeatherApiService) { }

  /**
    * Returns average humidity for next week by default
   */
  get(startDay: number = 1, endDay: number = 8): Observable<number> {
    return this.apiService.getCurrentForecast().pipe(
      map((forecast: WeatherApiData) => {
        if (!WeatherApiData.isValid(forecast)) {
          return -1;
        }

        if(startDay < 0 || endDay > forecast.data.length) {
          return -1;
        }

        const neededData = forecast.data.slice(startDay, endDay);
        const averageHumidity = neededData.reduce((acc, curr) => acc + curr.rh, 0) / forecast.data.length;
        return Math.round(averageHumidity);
      })
    );
  }
}
