import { Injectable } from '@angular/core';
import { AbstractOneDayWeatherService } from './abtract-weather-today.service';
import { map, Observable } from 'rxjs';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { WeatherApiData} from '../weather-api/weather-data.model';
import { emptyOneDayWeather } from './empty-one-day-weather';

@Injectable({
  providedIn: 'root'
})
export class OneDayWeatherService extends AbstractOneDayWeatherService {

  constructor(protected override apiService: AbstractWeatherApiService) {
    super(apiService);
  }

  /**
   * Returns today's weather by default, or the weather for the given number of days from now
   * Returns emptyOneDayWeather if data is invalid or storage does not contain data
   * @param daysFromNow
   */
  get(daysFromNow: number = 0): Observable<OneDayWeather> {
    return this.apiService.getCurrentForecast().pipe(
      map((forecast: WeatherApiData) => {
        if (!WeatherApiData.isValid(forecast) || forecast.data.length < daysFromNow + 1) {
          return emptyOneDayWeather;
        }

        return {
          city_name: forecast.city_name,
          temperature: forecast.data[0].temp,
          weatherDescription: forecast.data[0].weather.description,
          weatherIconUrl: forecast.data[0].weather.icon,
          wind_spd: forecast.data[0].wind_spd,
          rh: forecast.data[0].rh,
          uv: forecast.data[0].uv,
        };
      })
    );
  }
}
