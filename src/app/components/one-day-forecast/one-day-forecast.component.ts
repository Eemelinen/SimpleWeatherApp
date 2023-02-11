import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { emptyOneDayWeather } from './empty-one-day-weather';
import { AbstractOneDayForecastService } from '../../services/one-day-forecast/abtract-forecast-today.service';

@Component({
  selector: 'one-day-forecast',
  templateUrl: './one-day-forecast.component.html',
  styleUrls: ['./one-day-forecast.component.scss'],
})
export class OneDayForecastComponent implements OnInit {
  @Input() daysFromNow: number = 0;
  @Input() subHeader: string = 'Today\'s weather forecast';
  weatherData$: Observable<OneDayForecastComponentData> = of(emptyOneDayWeather);

  constructor(private WeatherTodayService: AbstractOneDayForecastService) {}

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

  private formatWindSpeed(wind: number): ExtraData {
    return {
      title: 'WS',
      imgUrl: `${environment.extra_data_icon_folder}wind.png`,
      value: `${wind} m/s`
    }
  }

  private formatUv(uvIndex: number): ExtraData {
    return {
      title: 'UV',
      imgUrl: `${environment.extra_data_icon_folder}uv.png`,
      value: uvIndex <= 2 ? 'Low' : uvIndex <= 6 ? 'Moderate' : 'High'
    }
  }

  private formatHumidity(humidity: number): ExtraData {
    return {
      title: 'RH',
      imgUrl: `${environment.extra_data_icon_folder}humidity.png`,
      value: `${humidity}%`
    }
  }
}
