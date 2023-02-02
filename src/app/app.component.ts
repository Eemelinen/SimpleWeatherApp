import { Component } from '@angular/core';
import { WeatherProviderService } from './services/weather-provider/weather-provider.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  subscriptions: Subscription[] = [];
  weatherData: string[] = [];

  constructor(private weatherProvider: WeatherProviderService) {
  }

  public getWeatherData(data: LocationPickerOutput) {
    console.log(data)
    this.subscriptions.push(
      this.weatherProvider.fetchWeatherForecast('NL', 'Amsterdam').subscribe(data => {
        console.log(data)
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
