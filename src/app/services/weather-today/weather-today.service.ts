import { Injectable } from '@angular/core';
import { AbstractWeatherTodayService } from './abtract-weather-today.service';
import { map, Observable } from 'rxjs';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { WeatherApiData} from '../weather-api/weather-data.model';
import { emptyWeatherToday } from './empty-weather-today';

const weatherIconFolderUrl = 'assets/images/weather-icons';
const extraDataIconsFolderUrl = 'assets/images/extra-data-icons';

@Injectable({
  providedIn: 'root'
})
export class WeatherTodayService extends AbstractWeatherTodayService {

  constructor(protected override apiService: AbstractWeatherApiService) {
    super(apiService);
  }

  get(): Observable<WeatherTodayData> {
    return this.apiService.getCurrentForecast().pipe(
      map((forecast: WeatherApiData) => {
        if (!WeatherApiData.isValid(forecast)) {
          return emptyWeatherToday;
        }

        return {
          city_name: forecast.city_name,
          temperature: forecast.data[0].temp,
          weatherDescription: forecast.data[0].weather.description,
          weatherIconUrl: `${weatherIconFolderUrl}/${forecast.data[0].weather.icon}.png`,
          extraData: [
            this.formatWindSpeed(forecast.data[0].wind_spd),
            this.formatUv(forecast.data[0].uv),
            this.formatHumidity(forecast.data[0].rh)
          ]
        };
      })
    );
  }


  private formatWindSpeed(wind: number): extraData {
    return {
      title: 'WS',
      imgUrl: `${extraDataIconsFolderUrl}/wind.png`,
      value: `${wind} m/s`
    }
  }

  private formatUv(uvIndex: number): extraData {
    return {
      title: 'UV',
      imgUrl: `${extraDataIconsFolderUrl}/uv.png`,
      value: uvIndex <= 2 ? 'Low' : uvIndex <= 6 ? 'Moderate' : 'High'
    }
  }

  private formatHumidity(humidity: number): extraData {
    return {
      title: 'RH',
      imgUrl: `${extraDataIconsFolderUrl}/humidity.png`,
      value: `${humidity}%`
    }
  }
}
