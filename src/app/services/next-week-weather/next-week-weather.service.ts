import { Injectable } from '@angular/core';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { map, Observable } from 'rxjs';
import { WeatherApiData } from '../weather-api/weather-api-response';
import { AbstractNextWeekWeatherService } from './abstract-next-week-weather.service';

@Injectable({
  providedIn: 'root'
})
export class NextWeekWeatherService extends AbstractNextWeekWeatherService {

  constructor(protected override apiService: AbstractWeatherApiService) {
    super(apiService);
  }

  get(): Observable<WeatherCardData[]> {
    return this.apiService.getCurrentForecast().pipe(
      map((res: WeatherApiData) => {
        return this.createOneWeekForecast(res.data);
      })
    );
  }

  private createOneWeekForecast(res: any): WeatherCardData[] {
    return res
      .slice(0, 7)
      .map((day: WeatherData) => {
        return {
          title: this.getDayName(day.datetime),
          temperatureValue: Math.round(day.temp)
        }
      });
  }

  private getDayName(date: any): string {
    const day = new Date(date).getDay();
    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    return days[day];
  }

}
