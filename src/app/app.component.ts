import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AbstractWeatherProviderService } from './services/weather-provider/abstract-weather-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  subscriptions: Subscription[] = [];
  forecasts: WeatherData[] = [];

  constructor(private weatherProvider: AbstractWeatherProviderService) {
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
        console.log(res);
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
