import { Injectable } from '@angular/core';
import { AbstractMultiDayForecastService } from './abstract-multi-day-forecast.service';
import { map, Observable } from 'rxjs';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { WeatherApiData } from '../weather-api/weather-data.model';
import { emptyMultiDayForecast } from './empty-multi-day-forecast';

type DateObject = { year: string; month: string; day: string };
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

@Injectable({
  providedIn: 'root'
})
export class MultiDayForecastService extends AbstractMultiDayForecastService {

  constructor(protected override apiService: AbstractWeatherApiService) {
    super(apiService);
  }

  get(startDay = 1, endDay = 8): Observable<MultiDayWeatherForecast> {
    return this.apiService.getCurrentForecast().pipe(
      map((forecast: WeatherApiData) => {
        if (!WeatherApiData.isValid(forecast)) {
          return emptyMultiDayForecast
        }

        const nextWeekData = forecast.data.slice(startDay, endDay);
        return {
          dateRange: this.getNextWeekDataRange(nextWeekData),
          forecasts: this.createWeatherCardData(nextWeekData)
        }
      }
    ));
  }

  private getNextWeekDataRange(nextWeekData: FullWeatherData[]): string {
    const dateRange = this.getDateRange(nextWeekData);
    return this.formatDateRange(dateRange.firstDateObj, dateRange.lastDateObj);
  }

  private createWeatherCardData(nextWeekData: FullWeatherData[]): WeekdayWeather[] {
    return nextWeekData
      .map((day: FullWeatherData) => {
        return {
          dayOfWeek: this.getDayOfWeek(day.datetime),
          weatherImg: day.weather.icon,
          weatherDescription: day.weather.description,
          temperature: day.temp
        }
      });
  }

  private getMonthName(month: number): string {
    return months[month];
  }

  private removeFirstCharIfZero(str: string): string {
    return str && str[0] === '0' ? str.slice(1) : str;
  }

  private getDateRange(forecasts: FullWeatherData[]): { firstDateObj: DateObject; lastDateObj: DateObject } {
    const [firstDateObj, lastDateObj] = [
      forecasts[0].datetime,
      forecasts[forecasts.length - 1].datetime
    ].map(dateString => {
      const [year, month, day] = dateString.split("-");
      return {
        year,
        month,
        day: this.removeFirstCharIfZero(day)
      };
    });

    return { firstDateObj, lastDateObj };
  }

  private formatDateRange(firstDate: DateObject, lastDate: DateObject): string {
    const firstMonth = this.getMonthName(Number(firstDate.month) - 1);
    const lastMonth = this.getMonthName(Number(lastDate.month) - 1);

    if (firstDate.year !== lastDate.year) {
      return `${firstMonth} ${firstDate.day}, ${firstDate.year} - ${lastMonth} ${lastDate.day} ${lastDate.year}`;
    }

    if (firstDate.month !== lastDate.month) {
      return `${firstMonth} ${firstDate.day} - ${lastMonth} ${lastDate.day} ${lastDate.year}`;
    }

    return `${firstMonth} ${firstDate.day} - ${lastDate.day} ${lastDate.year}`;
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
