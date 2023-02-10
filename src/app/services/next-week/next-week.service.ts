import { Injectable } from '@angular/core';
import { AbstractNextWeekService } from './abstract-next-week.service';
import { map, Observable } from 'rxjs';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { WeatherApiData } from '../weather-api/weather-data.model';
import { environment } from '../../../environments/environment';

type DateObject = { year: string; month: string; day: string };
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export const emptyNextWeekData: WeatherNextWeekData = {
  dateRange: '',
  averageTemperature: 0,
  weatherCards: [
    {
      dayOfWeek: '',
      weatherImgUrl: '',
      temperature: 0,
    }
  ]
}

@Injectable({
  providedIn: 'root'
})
export class NextWeekService extends AbstractNextWeekService {

  constructor(protected override apiService: AbstractWeatherApiService) {
    super(apiService);
  }

  get(): Observable<WeatherNextWeekData> {
    return this.apiService.getCurrentForecast().pipe(
      map((forecast: WeatherApiData) => {
        if (!WeatherApiData.isValid(forecast)) {
          return emptyNextWeekData
        }

        const nextWeekData = forecast.data.slice(1, 8);
        return {
          dateRange: this.getNextWeekDataRange(nextWeekData),
          averageTemperature: this.calculateAverageTemperature(nextWeekData),
          weatherCards: this.createWeatherCardData(nextWeekData)
        }
      }
    ));
  }

  private calculateAverageTemperature(nextWeekData: FullWeatherData[]): number {
    const temperatures = nextWeekData.map((data) => data.temp);
    const sum = temperatures.reduce((a, b) => a + b, 0);
    return Math.round(sum / temperatures.length);
  }

  private getNextWeekDataRange(nextWeekData: FullWeatherData[]): string {
    const dateRange = this.getDateRange(nextWeekData);
    return this.formatDateRange(dateRange.firstDateObj, dateRange.lastDateObj);
  }

  private createWeatherCardData(nextWeekData: FullWeatherData[]): SmallWeatherCardData[] {
    return nextWeekData
      .map((day: FullWeatherData) => {
        return {
          dayOfWeek: this.getDayOfWeek(day.datetime),
          weatherImgUrl: `${environment.weather_icon_folder}${day.weather.icon}`,
          temperature: Math.round(day.temp)
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
