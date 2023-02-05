import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { AbstractWeatherProviderService } from './services/weather-provider/abstract-weather-provider.service';
import { AbstractLocationService } from './services/location/abstract-location.service';
import { GradientBackgroundDirective } from './directives/bgGradient/gradient-background.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(GradientBackgroundDirective) directive!: GradientBackgroundDirective;
  subscriptions: Subscription[] = [];
  nextSevenDays: WeatherCardData[] = [];
  averageTemperature: number = 0;
  loadingWeatherData: boolean = false;
  averageTemperatureCard: WeatherCardData = { title: '', temperatureValue: 0 };

  constructor(
    private weatherProvider: AbstractWeatherProviderService,
    private locationService: AbstractLocationService
  ) {}

  ngOnInit(): void {
    // Todo: Change to reactive version
    this.subscriptions.push(
      this.weatherProvider.getAverageTemperature()
        .subscribe((data: WeatherCardData) => {
          this.averageTemperatureCard = data;
          this.updateBackgroundGradient(data);
      }),
      this.weatherProvider.getNextSevenDaysTemperature()
        .subscribe((data: WeatherCardData[]) => {
          this.nextSevenDays = data;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  updateForecast(location: LocationData): void {
    this.loadingWeatherData = true;
    this.subscriptions.push(
      this.weatherProvider.getWeather(location).subscribe(() => this.loadingWeatherData = false)
    );
  }

  getAvailableCountries(): string[] {
    return this.locationService.getAvailableCountries();
  }

  private updateBackgroundGradient(data: WeatherCardData) {
    if (data.title) {
      this.directive.changeEndpointColor(data.temperatureValue);
    }
  }
}
