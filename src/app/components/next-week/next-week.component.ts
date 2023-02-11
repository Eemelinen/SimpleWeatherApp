import { Component, Input, OnInit } from '@angular/core';
import { AbstractMultiDayForecastService } from '../../services/next-week/abstract-multi-day-forecast.service';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

type MultiDayComponentData = {
  dateRange: string;
  forecasts: WeekdayWeather[];
}

const emptyMultiDayComponentData: MultiDayComponentData = {
  dateRange: '',
  forecasts: [],
}

@Component({
  selector: 'app-next-week',
  templateUrl: './next-week.component.html',
  styleUrls: ['./next-week.component.scss'],
})
export class NextWeekComponent implements OnInit {
  @Input() header: string = 'Next week';
  forecast$: Observable<MultiDayComponentData> = of(emptyMultiDayComponentData);

  constructor(
    private multiDayForecast: AbstractMultiDayForecastService,
    ) {
  }

  ngOnInit(): void {
    this.forecast$ = this.multiDayForecast.get().pipe(
      map((data) => {
        return {
          ...data,
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

  private calculateAverageTemperature(nextWeekData: FullWeatherData[]): number {
    const temperatures = nextWeekData.map((data) => data.temp);
    const sum = temperatures.reduce((a, b) => a + b, 0);
    return Math.round(sum / temperatures.length);
  }

  getGraphData(dailyData: WeekdayWeather[]): number[] {
    return dailyData.map((data) => data.temperature);
  }
}
