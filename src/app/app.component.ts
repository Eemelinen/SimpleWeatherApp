import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {Observable, of, Subscription, tap} from 'rxjs';
import { AbstractWeatherProviderService } from './services/weather-provider/abstract-weather-provider.service';
import { AbstractLocationService } from './services/location/abstract-location.service';
import { GradientBackgroundDirective } from './directives/bgGradient/gradient-background.directive';
import {AverageTemperatureService} from './services/average-temperature/average-temperature.service';
import {AbstractWeatherApiService} from './services/weather-api/abstract-weather-api-service';
import {WeatherApiData} from './services/weather-api/weather-api-response';
import {AbstractAverageTemperatureService} from './services/average-temperature/abstract-average-temperature.service';
import {NextWeekWeatherService} from './services/next-week-weather/next-week-weather.service';
import {AbstractNextWeekWeatherService} from './services/next-week-weather/abstract-next-week-weather.service';

const defaultAverageTemp: WeatherCardData = { title: '', temperatureValue: 0 };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(GradientBackgroundDirective) directive!: GradientBackgroundDirective;
  nextWeekForecast$: Observable<WeatherCardData[]> = of([]);
  averageTempForecast$: Observable<WeatherCardData> = of(defaultAverageTemp);
  countries: string[] = [];
  loadingWeatherData = false;

  constructor(
    private weatherProvider: AbstractWeatherProviderService,
    private locationService: AbstractLocationService,
    private averageTempService: AbstractAverageTemperatureService,
    private weatherApiService: AbstractWeatherApiService,
    private nextWeekForecastService: AbstractNextWeekWeatherService,
  ) {}

  ngOnInit(): void {
    this.countries = this.locationService.getAvailableCountries();
    this.nextWeekForecast$ = this.nextWeekForecastService.get();
    this.averageTempForecast$ = this.averageTempService.get().pipe(
      tap((data: WeatherCardData) => {
        this.loadingWeatherData = false;
        this.updateBackgroundGradient(data);
      }));
  }

  updateForecast(location: LocationData): void {
    if (location.city && location.country) {
      this.loadingWeatherData = true;
      this.weatherApiService.updateWeatherData(location);
    }
  }

  private updateBackgroundGradient(data: WeatherCardData): void {
    if (data.title) {
      this.directive.changeEndpointColor(data.temperatureValue);
    }
  }
}
