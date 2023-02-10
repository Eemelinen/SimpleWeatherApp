import { Injectable } from '@angular/core';
import { AbstractWeatherTodayService } from './abtract-weather-today.service';
import { map, Observable } from 'rxjs';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { WeatherApiData} from '../weather-api/weather-data.model';
import { emptyWeatherToday } from './empty-weather-today';

const imageBaseUrl = 'assets/images';

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
          weatherIcon: forecast.data[0].weather.icon,
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
      title: 'Wind',
      imgUrl: `${imageBaseUrl}/wind.svg`,
      value: `${wind} m/s`
    }
  }

  private formatUv(uvIndex: number): extraData {
    return {
      title: 'UV',
      imgUrl: `${imageBaseUrl}/wind.svg`,
      value: uvIndex <= 2 ? 'Low' : uvIndex <= 6 ? 'Moderate' : 'High'
    }
  }

  private formatHumidity(humidity: number): extraData {
    return {
      title: 'Humidity',
      imgUrl: `${imageBaseUrl}/wind.svg`,
      value: `${humidity}%`
    }
  }
}
