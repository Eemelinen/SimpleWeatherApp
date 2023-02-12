import { Injectable } from '@angular/core';
import { AbstractMultiDayForecastService } from './abstract-multi-day-forecast.service';
import { map, Observable } from 'rxjs';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { WeatherApiData } from '../weather-api/weather-data.model';
import { emptyMultiDayForecast } from './empty-multi-day-forecast';
import { DatesToStringService } from '../date-range-formatter/dates-to-string.service';

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
      map((forecast: WeatherApiData) => {
        if (!WeatherApiData.isValid(forecast)) {
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

  private createWeatherCardData(nextWeekData: FullWeatherData[]): WeekdayWeather[] {
    return nextWeekData
      .map((day: FullWeatherData) => {
        return {
          dayOfWeek: this.getDayOfWeek(day.datetime),
          weatherImg: day.weather.icon,
          weatherDescription: day.weather.description,
          temperature: day.temp,
        }
      });
  }

  private getDayOfWeek(date: string): string {
    const dayOfWeek = new Date(date).getDay();
    switch (dayOfWeek) {
      case 0:
        return 'Sun';
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wed';
      case 4:
        return 'Thu';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
      default:
        return '';
    }
  }
}
