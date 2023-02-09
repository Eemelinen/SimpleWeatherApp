import { Injectable } from '@angular/core';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { map, Observable } from 'rxjs';
import { WeatherApiResponse } from '../weather-api/weather-api-response';
import { AbstractNextWeekWeatherService } from './abstract-next-week-weather.service';

const days = [ 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

@Injectable({
  providedIn: 'root'
})
export class NextWeekWeatherService extends AbstractNextWeekWeatherService {

  constructor(protected override apiService: AbstractWeatherApiService) {
    super(apiService);
  }

  get(): Observable<WeatherCardData[]> {
    return this.apiService.getCurrentForecast().pipe(
      map((d: WeatherApiResponse) => {
        return this.createOneWeekForecast(d.data);
      })
    );
  }

  private createOneWeekForecast(res: FullWeatherData[]): WeatherCardData[] {
    return res
      .slice(0, 7)
      .map((day: FullWeatherData) => {
        return {
          date: this.getDayName(day.datetime),
          temperature: Math.round(day.temp)
        }
      });
  }

  private getDayName(date: string): string {
    const day = new Date(date).getDay();
    return days[day];
  }

}
