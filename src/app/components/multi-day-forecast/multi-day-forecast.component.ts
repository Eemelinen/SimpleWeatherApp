import { Component, Input, OnInit } from '@angular/core';
import { AbstractMultiDayForecastService } from '../../services/multi-day-forecast/abstract-multi-day-forecast.service';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { emptyMultiDayComponentData } from './empty-multiday-component-data';
import { calcTempDiff } from '../../shared/calc-temp-diff';
import { formatGraphData } from '../../shared/format-graph-data';
import { calcTempAvg } from '../../shared/calc-temp-avg';

@Component({
  selector: 'multi-day-forecast',
  templateUrl: './multi-day-forecast.component.html',
  styleUrls: ['./multi-day-forecast.component.scss'],
})
export class MultiDayForecastComponent implements OnInit {
  @Input() header: string = 'Next week';
  @Input() showGraph: boolean = true;
  @Input() showAverages: boolean = true;

  forecast$: Observable<MultiDayComponentData> = of(emptyMultiDayComponentData);

  constructor(
    private multiDayForecast: AbstractMultiDayForecastService,
  ) {}

  ngOnInit(): void {
    this.forecast$ = this.multiDayForecast.get().pipe(
      map((data) => {
        return {
          ...data,
          graphData: formatGraphData(data.forecasts),
          averages: [
            {
              title: 'Avg. Temp',
              imgUrl: `${environment.extra_data_icon_folder}thermometer.png`,
              value: `${calcTempAvg(data.forecasts)}°C`
            },
            {
              title: 'Diff. Temp',
              imgUrl: `${environment.extra_data_icon_folder}humidity.png`,
              value: calcTempDiff(data.forecasts) + '°C'
            },
          ],
          forecasts: data.forecasts.map((forecast) => {
            return {
              ...forecast,
              temperature: Math.round(forecast.temperature),
              weatherImg: `${environment.weather_icon_folder}${forecast.weatherImg}.png`,
            }
          })
        }
      })
    );
  }
}
