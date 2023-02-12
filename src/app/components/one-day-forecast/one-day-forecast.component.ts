import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { emptyOneDayWeather } from './empty-one-day-weather';
import { AbstractOneDayForecastService } from '../../services/one-day-forecast/abtract-forecast-today.service';
import { extraDataHumidity } from '../../shared/extra-data-humidity';
import { extraDataWindSpeed } from '../../shared/extra-data-wind-speed';
import { extraDataUV } from '../../shared/extra-data-uv';
import { EnvironmentService } from '../../services/environment/environment.service';

@Component({
  selector: 'one-day-forecast',
  templateUrl: './one-day-forecast.component.html',
  styleUrls: ['./one-day-forecast.component.scss'],
})
export class OneDayForecastComponent implements OnInit {
  @Input() daysFromNow: number = 0;
  @Input() subHeader: string = 'Today\'s weather forecast';
  weatherData$: Observable<OneDayForecastComponentData> = of(emptyOneDayWeather);

  constructor(
    private environment: EnvironmentService,
    private forecast: AbstractOneDayForecastService,
  ) {}

  ngOnInit(): void {
    this.weatherData$ = this.forecast.get(this.daysFromNow).pipe(
      map((data) => {
        return {
          ...data,
          weatherIconUrl: `${this.environment.weather_icon_folder}${data.weatherIcon}.png`,
          extraData: [
            extraDataHumidity(data.rh, this.environment.extra_data_icon_folder),
            extraDataUV(data.uv, this.environment.extra_data_icon_folder),
            extraDataWindSpeed(data.wind_spd, this.environment.extra_data_icon_folder),
          ]
        }
      })
    );
  }
}
