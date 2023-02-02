import { Component } from '@angular/core';
import {WeatherProviderService} from './services/weather-provider/weather-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  weatherData: string[] = [];

  constructor(private weatherProvider: WeatherProviderService) {
    this.weatherProvider.getTenDaysOfWeather('US', 'New York').subscribe(data => {
      console.log(data)
      // this.weatherData = [data];
    });
  }
}
