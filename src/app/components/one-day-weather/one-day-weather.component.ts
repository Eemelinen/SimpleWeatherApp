import { Component, Input, OnInit } from '@angular/core';
import { AbstractOneDayWeatherService } from '../../services/weather-today/abtract-weather-today.service';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { emptyOneDayWeather } from './empty-one-day-weather';

type ComponentData = {
  city_name: string;
  temperature: number;
  weatherDescription: string;
  weatherIconUrl: string;
  extraData: extraData[]
}

@Component({
  selector: 'one-day-weather',
  templateUrl: './one-day-weather.component.html',
  styleUrls: ['./one-day-weather.component.scss'],
})
export class OneDayWeatherComponent implements OnInit {
  @Input() daysFromNow: number = 0;
  @Input() subHeader: string = 'Today\'s weather forecast';
  weatherData$: Observable<ComponentData> = of(emptyOneDayWeather);

  constructor(private WeatherTodayService: AbstractOneDayWeatherService) {}

  ngOnInit(): void {
    this.weatherData$ = this.WeatherTodayService.get(this.daysFromNow).pipe(
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
