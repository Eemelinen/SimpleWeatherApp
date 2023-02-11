import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { emptyOneDayWeather } from './empty-one-day-weather';
import { AbstractOneDayForecastService } from '../../services/one-day-forecast/abtract-forecast-today.service';
import { extraDataHumidity } from '../../shared/extra-data-humidity';
import { extraDataWindSpeed } from '../../shared/extra-data-wind-speed';
import { extraDataUV } from '../../shared/extra-data-uv';

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
            extraDataHumidity(data.rh),
            extraDataUV(data.uv),
            extraDataWindSpeed(data.wind_spd),
          ]
        }
      })
    );
  }
}
