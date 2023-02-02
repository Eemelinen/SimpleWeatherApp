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
  forecasts: WeatherData[] = [];

  constructor(private weatherProvider: WeatherProviderService) {
  }

  // getWeatherData(): any {
  //   this.subscriptions.push(
  //     this.weatherProvider.weatherData$.subscribe(data => {
  //       this.weatherData = data;
  //     })
  //   );
  // }

  nextWeekData(): WeatherData[] {
    return this.forecasts.slice(0, 7);
  }

  public updateWeatherData(data: LocationPickerOutput) {
    this.subscriptions.push(
      this.weatherProvider.fetchWeatherForecast(data.country, data.city).subscribe((res: any) => {
        this.forecasts = res.data.map((day: any) => {
          return {
            date: day.datetime,
            temp: day.temp
          }
        });
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
