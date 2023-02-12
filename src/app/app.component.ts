import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AbstractLocationService } from './services/location/abstract-location.service';
import { GradientBackgroundDirective } from './directives/bgGradient/gradient-background.directive';
import { AbstractWeatherApiService } from './services/weather-api/abstract-weather-api-service';
import { AbstractMultiDayForecastService } from './services/multi-day-forecast/abstract-multi-day-forecast.service';
import { AbstractLoadingService } from './services/loading/abstract-loading-service';
import { calcTempAvg } from './shared/calc-temp-avg';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(GradientBackgroundDirective) bgDirective!: GradientBackgroundDirective;
  loadingWeatherData = false;
  countries: string[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private locationService: AbstractLocationService,
    private weatherApiService: AbstractWeatherApiService,
    private multiDayForecast: AbstractMultiDayForecastService,
    private loadingService: AbstractLoadingService,
  ) {}

  ngOnInit(): void {
    this.countries = this.locationService.getAvailableCountries();

    this.subscriptions.push(
      this.multiDayForecast.get().subscribe((data: MultiDayWeatherForecast) => (
            this.updateBackgroundGradient(Math.round(calcTempAvg(data.forecasts))))),
      this.loadingService.getLoading().subscribe(l => this.loadingWeatherData = l)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  updateForecast(location: LocationData): void {
    this.weatherApiService.updateWeatherData(location);
  }

  private updateBackgroundGradient(avgTemp: number): void {
    if (avgTemp || avgTemp === 0) {
      try {
        this.bgDirective.changeEndpointColor(avgTemp);
      } catch (e) {
        return;
      }
    }
  }
}
