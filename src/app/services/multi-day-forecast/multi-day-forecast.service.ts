import { Injectable } from '@angular/core';
import { AbstractMultiDayForecastService } from './abstract-multi-day-forecast.service';
import { map, Observable } from 'rxjs';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { StoredWeatherData } from '../weather-api/weather-data.model';
import { emptyMultiDayForecast } from './empty-multi-day-forecast';
import { DatesToStringService } from '../date-range-formatter/dates-to-string.service';
import {getWeekday} from '../../shared/get-day-of-the-week';

@Injectable({
  providedIn: 'root'
})
export class MultiDayForecastService extends AbstractMultiDayForecastService {

  constructor(
    protected override apiService: AbstractWeatherApiService,
    private datesToString: DatesToStringService
  ) {
    super(apiService);
  }

  get(startDay = 1, endDay = 8): Observable<MultiDayWeatherForecast> {
    return this.apiService.getCurrentForecast().pipe(
      map((forecast: StoredWeatherData) => {
        if (!StoredWeatherData.isValid(forecast)) {
          return emptyMultiDayForecast
        }

        const data = forecast.data.slice(startDay, endDay);
        return {
          dateRange: this.datesToString.format(data),
          forecasts: this.createWeatherCardData(data)
        }
      }
    ));
  }

  private createWeatherCardData(forecasts: ApiWeatherData[]): WeekdayWeather[] {
    return forecasts
      .map((day: ApiWeatherData) => {
        return {
          dayOfWeek: getWeekday(day.datetime),
          weatherImg: day.weather.icon,
          weatherDescription: day.weather.description,
          temperature: day.temp,
        }
      });
  }
}
