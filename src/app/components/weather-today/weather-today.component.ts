import { Component, OnInit } from '@angular/core';
import { AbstractWeatherTodayService } from '../../services/weather-today/abtract-weather-today.service';
import { Observable, of } from 'rxjs';
import { emptyWeatherToday } from '../../services/weather-today/empty-weather-today';

@Component({
  selector: 'app-weather-today',
  templateUrl: './weather-today.component.html',
  styleUrls: ['./weather-today.component.scss'],
})
export class WeatherTodayComponent implements OnInit {
  weatherData$: Observable<WeatherTodayData> = of(emptyWeatherToday);

  constructor(private WeatherTodayService: AbstractWeatherTodayService) {}

  ngOnInit(): void {
    this.weatherData$ = this.WeatherTodayService.get();
  }

}
