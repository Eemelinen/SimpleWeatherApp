import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { AbstractWeatherProviderService } from './services/weather-provider/abstract-weather-provider.service';
import { AbstractLocationService } from './services/location/abstract-location.service';
import { GradientBackgroundDirective } from './directives/bg-gradient/gradient-background.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(GradientBackgroundDirective) directive!: GradientBackgroundDirective;

  subscriptions: Subscription[] = [];
  forecasts: WeatherData[] = [];
  averageTemperature: number = 9999;

  constructor(
    private weatherProvider: AbstractWeatherProviderService,
    private locationService: AbstractLocationService
  ) {}

  ngOnInit(): void {
    this.getWeatherData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  updateForecast(location: LocationData): void {
    this.weatherProvider.updateWeatherForecast(location);
  }

  getAvailableCountries(): string[] {
    return this.locationService.getAvailableCountries();
  }

  getWeatherData(): void {
    this.subscriptions.push(
      this.weatherProvider.getWeather().subscribe((forecasts: WeatherData[]) => {
        this.forecasts = forecasts;
        if (forecasts.length) {
          this.setAverageTemperature(forecasts);
        }
      }));
  }

  private setAverageTemperature(forecasts: WeatherData[]) {
    this.averageTemperature = this.calculateAverageTemperature(forecasts);
    this.directive.changeEndpointColor(this.averageTemperature);
  }

  nextWeekData(forecasts: WeatherData[]): WeatherData[] {
    if (forecasts.length > 7) {
      return forecasts.slice(0, 7);
    }
    // Todo: Add snackbar to inform user that there is no data for the next 7 days
    return [];
  }

  private calculateAverageTemperature(forecasts: WeatherData[]) {
    const total = forecasts.reduce((acc, day: WeatherData) => acc + day.temp, 0);
    return Math.round((total / forecasts.length));
  }
}
