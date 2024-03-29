import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { StoredWeatherData} from '../weather-api/weather-data.model';
import { emptyOneDayForecast } from './empty-one-day-forecast';
import { AbstractOneDayForecastService } from './abtract-forecast-today.service';

@Injectable({
  providedIn: 'root'
})
export class OneDayForecastService extends AbstractOneDayForecastService {

  constructor(protected override apiService: AbstractWeatherApiService) {
    super(apiService);
  }

  /**
   * Returns today's weather by default, or the weather for the given number of days from now
   * Returns emptyOneDayWeather if data is invalid or storage does not contain data
   * @param daysFromNow
   */
  get(daysFromNow: number = 0): Observable<OneDayForecast> {
    return this.apiService.getCurrentForecast().pipe(
      map((forecast: StoredWeatherData) => {
        if (!StoredWeatherData.isValid(forecast) || forecast.data.length < daysFromNow + 1) {
          return emptyOneDayForecast;
        }

        return {
          city_name: forecast.city_name,
          temperature: forecast.data[0].temp,
          weatherDescription: forecast.data[0].weather.description,
          weatherIcon: forecast.data[0].weather.icon,
          wind_spd: forecast.data[0].wind_spd,
          rh: forecast.data[0].rh,
          uv: forecast.data[0].uv,
        };
      })
    );
  }
}
