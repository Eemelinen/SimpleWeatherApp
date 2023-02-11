import { Component, OnInit } from '@angular/core';
import { AbstractOneDayWeatherService } from '../../services/weather-today/abtract-weather-today.service';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { emptyWeatherToday } from './empty-weather-today';

type ComponentData = {
  city_name: string;
  temperature: number;
  weatherDescription: string;
  weatherIconUrl: string;
  extraData: extraData[]
}

@Component({
  selector: 'app-weather-today',
  templateUrl: './weather-today.component.html',
  styleUrls: ['./weather-today.component.scss'],
})
export class WeatherTodayComponent implements OnInit {
  weatherData$: Observable<ComponentData> = of(emptyWeatherToday);

  constructor(private WeatherTodayService: AbstractOneDayWeatherService) {}

  ngOnInit(): void {
    this.weatherData$ = this.WeatherTodayService.get().pipe(
      map((data) => {
        return {
          ...data,
          weatherIconUrl: `${environment.weather_icon_folder}${data.weatherIconUrl}.png`,
          extraData: [
            this.formatHumidity(data.rh),
            this.formatUv(data.uv),
            this.formatWindSpeed(data.wind_spd),
          ]
        }
      })
    );
  }

  // Todo: this formatting logic is more presentational and should be moved to component
  private formatWindSpeed(wind: number): extraData {
    return {
      title: 'WS',
      imgUrl: `${environment.extra_data_icon_folder}wind.png`,
      value: `${wind} m/s`
    }
  }

  private formatUv(uvIndex: number): extraData {
    return {
      title: 'UV',
      imgUrl: `${environment.extra_data_icon_folder}uv.png`,
      value: uvIndex <= 2 ? 'Low' : uvIndex <= 6 ? 'Moderate' : 'High'
    }
  }

  private formatHumidity(humidity: number): extraData {
    return {
      title: 'RH',
      imgUrl: `${environment.extra_data_icon_folder}humidity.png`,
      value: `${humidity}%`
    }
  }
}
