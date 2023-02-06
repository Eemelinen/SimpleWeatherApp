import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { AbstractWeatherProviderService } from './abstract-weather-provider.service';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { WeatherApiData } from '../weather-api/weather-api-response';

type DateObject = { year: string; month: string; day: string };

@Injectable({
  providedIn: 'root'
})
export class WeatherProviderService extends AbstractWeatherProviderService {
  private averageTemperature$$ = new BehaviorSubject<WeatherCardData>({title: '', temperatureValue: 0});
  private averageTemperature$ = this.averageTemperature$$.asObservable();

  private nextSevenDaysTemperature$$ = new BehaviorSubject<WeatherCardData[]>([]);
  private nextSevenDaysTemperature$ = this.nextSevenDaysTemperature$$.asObservable();

  getAverageTemperature(): Observable<WeatherCardData> {
    return this.averageTemperature$;
  }

  getNextSevenDaysTemperature(): Observable<WeatherCardData[]> {
    return this.nextSevenDaysTemperature$;
  }

  constructor(
    protected override apiService: AbstractWeatherApiService
  ) {
    super(apiService);
    this.getWeather({country: "NL", city: "Amsterdam"});
  }

  getWeather(location: LocationData): Observable<any> {
    return of([]);
    // if (location.city && location.country) {
    //   return this.apiService.getWeatherData(location)
    //   // return of(mockWeatherApiResponse)
    //     .pipe(
    //       map((res: any) => {
    //         if (!res) {
    //           return null;
    //         }
    //
    //         if (location.city && location.city.toLowerCase() !== res.city_name.toLowerCase()) {
    //           return null;
    //         }
    //         return res;
    //       }),
    //       map((res: any) => {
    //         if (res) {
    //           return this.createWeatherData(res);
    //         }
    //         return null;
    //       }),
    //       tap((res: any) => {
    //         if (res) {
    //           this.createOneWeekForecast(res);
    //           this.createAverageTempValue(res);
    //         } else {
    //           this.emptyWeatherData();
    //         }
    //       }),
    //     );
    // } else {
    //   this.emptyWeatherData();
    //   return of([]);
    // }
  }

  private createAverageTempValue(res: any) {
    const dateRange = this.getDates(res);
    const averageTemp = this.calculateAverageTemperature(res);
    const averageTemperatureCard = {
      title: dateRange,
      temperatureValue: averageTemp
    }
    this.averageTemperature$$.next(averageTemperatureCard);
  }

  private createWeatherData(res: WeatherApiData): WeatherData[] {
    if (!res) {
      return [];
    }

    // @ts-ignore
    return res.data.map((day: WeatherData) => {
      return {
        datetime: day.datetime,
        temp: day.temp
      }
    })
  }

  private calculateAverageTemperature(res: any): number {
    const total = res.reduce((acc: any, day: WeatherData) => acc + day.temp, 0);
    return Math.round((total / res.length));
  }

  private createOneWeekForecast(res: any): void {
    const days = res.slice(0, 7);
    const tempNextSevenDays: WeatherCardData[] = days.map((day: WeatherData) => {
      return {
        title: this.getDayName(day.datetime),
        temperatureValue: Math.round(day.temp)
      }
    });
    this.nextSevenDaysTemperature$$.next(tempNextSevenDays);
  }

  private getDayName(date: any): string {
    const day = new Date(date).getDay();
    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    return days[day];
  }

  private emptyWeatherData() {
    this.averageTemperature$$.next({title: '', temperatureValue: 0});
    this.nextSevenDaysTemperature$$.next([]);
  }

  getDates(data: WeatherData[]): string {
    const dateRange = this.getDateRange(data);
    return this.formatDateRange(dateRange.firstDateObj, dateRange.lastDateObj);
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
    const firstDate = data[0].datetime;
    const lastDate = data[data.length - 1].datetime;

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
