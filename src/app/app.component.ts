import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { AbstractWeatherProviderService } from './services/weather-provider/abstract-weather-provider.service';
import { AbstractLocationService } from './services/location/abstract-location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  subscriptions: Subscription[] = [];
  forecasts$: Observable<WeatherData[]> = of([]);

  constructor(
    private weatherProvider: AbstractWeatherProviderService,
    private locationService: AbstractLocationService
  ) {}

  getAvailableCountries(): string[] {
    return this.locationService.getAvailableCountries();
  }

  nextWeekData(forecasts: WeatherData[]): WeatherData[] {
    if (forecasts.length > 7) {
      return forecasts.slice(0, 7);
    }
    // Todo: Add snackbar to inform user that there is no data for the next 7 days
    return [];
  }

  // Todo: Fetching should be handled trough other route
  updateWeatherData(data: LocationPickerOutput) {
    this.forecasts$ = this.weatherProvider.getWeather(data.country, data.city);
  }

  // Todo: probably unnecessary since using reactive programming
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
