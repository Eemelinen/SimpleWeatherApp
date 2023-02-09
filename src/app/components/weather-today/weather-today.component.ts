import { Component, OnInit } from '@angular/core';
import { AbstractWeatherTodayService } from '../../services/weather-today/abtract-weather-today.service';
import { Observable, of } from 'rxjs';
import { WeatherApiData } from '../../services/weather-api/weather-data.model';
import { emptyWeatherData } from '../../services/weather-api/empty-weather-data';

@Component({
  selector: 'app-weather-today',
  templateUrl: './weather-today.component.html',
  styleUrls: ['./weather-today.component.scss']
})
export class WeatherTodayComponent implements OnInit {
  weatherData$: Observable<WeatherApiData> = of(emptyWeatherData);

  constructor(private WeatherTodayService: AbstractWeatherTodayService) {
  }

  ngOnInit(): void {
    this.weatherData$ = this.WeatherTodayService.get();
  }

}
