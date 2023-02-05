import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
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
  loadingWeatherData: boolean = false;

  constructor(
    private weatherProvider: AbstractWeatherProviderService,
    private locationService: AbstractLocationService
  ) {}

  ngOnInit(): void {
    // Todo: Change to reactive version
    this.getWeatherData();
    this.getLoading();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getLoading(): void{
    this.subscriptions.push(
      this.weatherProvider.getLoading().subscribe((loading: boolean) => {
        this.loadingWeatherData = loading;
      })
    );
  }

  updateForecast(location: LocationData): void {
    console.log('location', location)
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
      }),
    );
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
