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
  weatherData: WeatherData[] = [];

  constructor(private weatherProvider: WeatherProviderService) {
  }

  // getWeatherData(): any {
  //   this.subscriptions.push(
  //     this.weatherProvider.weatherData$.subscribe(data => {
  //       this.weatherData = data;
  //     })
  //   );
  // }

  public updateWeatherData(data: LocationPickerOutput) {
    this.subscriptions.push(
      this.weatherProvider.fetchWeatherForecast(data.country, data.city).subscribe((res: any) => {
        console.log(res)
        this.weatherData = res.data.map((day: any) => {
          console.log(day)
          return {
            date: day.datetime,
            temp: day.temp
          }
        });
      })
    );
    console.log(this.weatherData);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
