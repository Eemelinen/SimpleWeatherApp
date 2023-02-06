import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AbstractAverageTemperatureService } from './abstract-average-temperature.service';
import { WeatherApiData } from '../weather-api/weather-api-response';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';

type DateObject = { year: string; month: string; day: string };

@Injectable({
  providedIn: 'root'
})
export class AverageTemperatureService extends AbstractAverageTemperatureService {

  constructor(protected override apiService: AbstractWeatherApiService) {
    super(apiService);
  }

  get(): Observable<WeatherCardData> {
    return this.apiService.getCurrentForecast().pipe(
      map((forecast: WeatherApiData) => {
        if (!forecast.city_name || !forecast.country_code || !forecast.data.length) {
          return { title: '', temperatureValue: 0 };
        }
        return this.createAverageTempValue(forecast.data);
      })
    );
  }

  // Todo: refactor these methods

  private createAverageTempValue(forecasts: any): WeatherCardData
  {
    const dateRange = this.getDates(forecasts);
    const averageTemp = this.calculateAverageTemperature(forecasts);
    return {
      title: dateRange,
      temperatureValue: averageTemp
    };
  }

  getDates(forecasts: any): string {
    const dateRange = this.getDateRange(forecasts);
    return this.formatDateRange(dateRange.firstDateObj, dateRange.lastDateObj);
  }

  private calculateAverageTemperature(forecasts: any): number {
    const total = forecasts.reduce((acc: any, day: WeatherData) => acc + day.temp, 0);
    return Math.round((total / forecasts.length));
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

  private getDateRange(forecasts: any[]): { firstDateObj: DateObject; lastDateObj: DateObject } {
    const firstDate = forecasts[0].datetime;
    const lastDate =  forecasts[forecasts.length - 1].datetime;

    const [fYear, fMonth, fDay] = firstDate.split("-");
    const [eYear, eMonth, eDay] = lastDate.split("-");

    const firstDateObj = {year: fYear, month: fMonth, day: this.removeFirstCharIfZero(fDay)};
    const lastDateObj = {year:eYear, month: eMonth, day: this.removeFirstCharIfZero(eDay)};

    return { firstDateObj, lastDateObj }
  }

  private getMonthName(month: number): string {
    const months = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];
    return months[month];
  }

  private removeFirstCharIfZero(str: string): string {
    if (str && str[0] === '0') {
      return str.slice(1);
    }
    return str;
  }

}
