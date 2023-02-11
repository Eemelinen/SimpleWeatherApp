import { Component, Input, OnInit } from '@angular/core';
import { AbstractMultiDayForecastService } from '../../services/next-week/abstract-multi-day-forecast.service';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

type MultiDayComponentData = {
  dateRange: string;
  forecasts: WeekdayWeather[];
  averages: ExtraData[],
  graphData: number[];
}

const emptyMultiDayComponentData: MultiDayComponentData = {
  dateRange: '',
  forecasts: [],
  averages: [],
  graphData: [],
}

@Component({
  selector: 'app-next-week',
  templateUrl: './next-week.component.html',
  styleUrls: ['./next-week.component.scss'],
})
export class NextWeekComponent implements OnInit {
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
          graphData: this.getGraphData(data.forecasts),
          averages: [
            {
              title: 'Avg. Temp',
              imgUrl: `${environment.extra_data_icon_folder}thermometer.png`,
              value: `${this.calcAvgTemperature(data.forecasts)}°C`
            },
            {
              title: 'Diff. Temp',
              imgUrl: `${environment.extra_data_icon_folder}humidity.png`,
              value: this.calcTemperatureDiff(data.forecasts) + '°C'
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

  private calcTemperatureDiff(nextWeekData: WeekdayWeather[]): number {
    let temperatures = nextWeekData.map((data) => data.temperature)
    let minTemperature = Math.min(...temperatures);
    let maxTemperature = Math.max(...temperatures);
    let temperatureDifference = maxTemperature - minTemperature;

    return Math.round(temperatureDifference);
  }

  private calcAvgTemperature(nextWeekData: WeekdayWeather[]): number {
    const avgTemperature = nextWeekData.reduce(
      (sum, data) => sum + data.temperature, 0) / nextWeekData.length;
    return +avgTemperature.toFixed(1);
  }

  private getGraphData(dailyData: WeekdayWeather[]): number[] {
    return dailyData.map((data) => data.temperature);
  }
}
