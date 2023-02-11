import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AbstractLocationService } from './services/location/abstract-location.service';
import { GradientBackgroundDirective } from './directives/bgGradient/gradient-background.directive';
import { AbstractWeatherApiService } from './services/weather-api/abstract-weather-api-service';
import { AbstractMultiDayForecastService } from './services/multi-day-forecast/abstract-multi-day-forecast.service';
import { calcAvgTemperature } from './shared/calc-avg-temp';
import { AbstractLoadingService } from './services/loading/abstract-loading-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(GradientBackgroundDirective) directive!: GradientBackgroundDirective;
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
      this.multiDayForecast.get().subscribe((data: MultiDayWeatherForecast) => {
        this.updateBackgroundGradient(
          Math.round(calcAvgTemperature(data.forecasts))
        );
      }),
      this.loadingService.getLoading().subscribe(l => {
        this.loadingWeatherData = l;
      })
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
        this.directive.changeEndpointColor(avgTemp);
      } catch (e) {
        return;
      }
    }
  }
}
