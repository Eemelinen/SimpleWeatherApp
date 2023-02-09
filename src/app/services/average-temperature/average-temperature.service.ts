import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AbstractAverageTemperatureService } from './abstract-average-temperature.service';
import { WeatherApiResponse } from '../weather-api/weather-api-response';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';

type DateObject = { year: string; month: string; day: string };
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

@Injectable({
  providedIn: 'root'
})
export class AverageTemperatureService extends AbstractAverageTemperatureService {

  constructor(protected override apiService: AbstractWeatherApiService) {
    super(apiService);
  }

  get(): Observable<WeatherCardData> {
    return this.apiService.getCurrentForecast().pipe(
      map((forecast: WeatherApiResponse) => {
        if (!forecast.city_name || !forecast.country_code || !forecast.data.length) {
          return { date: '', temperature: 0 };
        }
        return this.createAverageTempValue(forecast.data);
      })
    );
  }

  private createAverageTempValue(forecasts: FullWeatherData[]): WeatherCardData
  {
    const dateRange = this.getDates(forecasts);
    const averageTemp = this.calculateAverageTemperature(forecasts);
    return {
      date: dateRange,
      temperature: averageTemp
    };
  }

  private getDates(forecasts: FullWeatherData[]): string {
    const dateRange = this.getDateRange(forecasts);
    return this.formatDateRange(dateRange.firstDateObj, dateRange.lastDateObj);
  }

  private calculateAverageTemperature(forecasts: FullWeatherData[]): number {
    const total = forecasts.reduce((acc: number, day: FullWeatherData) => acc + day.temp, 0);
    return Math.round((total / forecasts.length));
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

}
