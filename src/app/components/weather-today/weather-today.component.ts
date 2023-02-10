import { Component, OnInit } from '@angular/core';
import { AbstractWeatherTodayService } from '../../services/weather-today/abtract-weather-today.service';
import { Observable, of } from 'rxjs';
import {mockWeatherTodayData} from '../../../mocks/mock-weather-today-data';

@Component({
  selector: 'app-weather-today',
  templateUrl: './weather-today.component.html',
  styleUrls: ['./weather-today.component.scss']
})
export class WeatherTodayComponent implements OnInit {
  weatherData$: Observable<WeatherTodayData> = of(mockWeatherTodayData);
  // weatherData$: Observable<WeatherTodayData> = of(emptyWeatherToday);

  constructor(private WeatherTodayService: AbstractWeatherTodayService) {}

  ngOnInit(): void {
    // this.weatherData$ = this.WeatherTodayService.get();
  }

}
