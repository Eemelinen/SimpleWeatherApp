import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { WeatherApiService } from '../weather-api/weather-api.service';
import { AbstractAverageTemperatureService } from './abstract-average-temperature.service';
import { WeatherApiData } from '../weather-api/weather-api-response';
import {AbstractWeatherApiService} from '../weather-api/abstract-weather-api-service';

type DateObject = { year: string; month: string; day: string };

@Injectable({
  providedIn: 'root'
})
export class AverageTemperatureService extends AbstractAverageTemperatureService {
  private averageTemperature$$ = new BehaviorSubject<WeatherCardData>({title: '', temperatureValue: 0});
  private averageTemperature$ = this.averageTemperature$$.asObservable();

  constructor(private weatherApiService: AbstractWeatherApiService) {
    super(weatherApiService);
    this.weatherApiService.getCurrentForecast().subscribe((forecast: WeatherApiData) => {
      console.log(forecast)
      // Todo: check if this is how api service works
      if (forecast.city_name && !forecast.country_code && !forecast.data.length) {
        this.averageTemperature$$.next(this.createAverageTempValue(forecast));
      }
    });
  }

  get(): Observable<any> {
    return this.averageTemperature$;

    // return this.weatherApiService.getCurrentForecast().pipe(
    //   map((forecast: WeatherApiData) => {
    //     console.log(forecast)
    //     // Todo: check if this is how api service works
    //     if (!forecast.city_name || !forecast.country_code || !forecast.data.length) {
    //       return forecast;
    //     }
    //     return this.createAverageTempValue(forecast);
    //   }),
    // );
  }

  private createAverageTempValue(res: any): WeatherCardData {
    const dateRange = this.getDates(res);
    const averageTemp = this.calculateAverageTemperature(res);
    return {
      title: dateRange,
      temperatureValue: averageTemp
    };
  }

  getDates(data: WeatherData[]): string {
    const dateRange = this.getDateRange(data);
    return this.formatDateRange(dateRange.firstDateObj, dateRange.lastDateObj);
  }

  private calculateAverageTemperature(res: any): number {
    const total = res.reduce((acc: any, day: WeatherData) => acc + day.temp, 0);
    return Math.round((total / res.length));
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

  private getDateRange(data: WeatherData[]): { firstDateObj: DateObject; lastDateObj: DateObject } {
    const firstDate = data[0].date;
    const lastDate = data[data.length - 1].date;

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
