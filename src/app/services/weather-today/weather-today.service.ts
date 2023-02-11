import { Injectable } from '@angular/core';
import { AbstractWeatherTodayService } from './abtract-weather-today.service';
import { map, Observable } from 'rxjs';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { WeatherApiData} from '../weather-api/weather-data.model';
import { emptyOneDayWeather } from './empty-one-day-weather';

const weatherIconFolderUrl = 'assets/images/weather-icons';
const extraDataIconsFolderUrl = 'assets/images/extra-data-icons';

// Todo: rename to one day data to make more generic
@Injectable({
  providedIn: 'root'
})
export class WeatherTodayService extends AbstractWeatherTodayService {

  constructor(protected override apiService: AbstractWeatherApiService) {
    super(apiService);
  }

  get(): Observable<oneDayWeather> {
    return this.apiService.getCurrentForecast().pipe(
      map((forecast: WeatherApiData) => {
        if (!WeatherApiData.isValid(forecast)) {
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
