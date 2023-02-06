import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {Observable, of, Subscription, tap} from 'rxjs';
import { AbstractWeatherProviderService } from './services/weather-provider/abstract-weather-provider.service';
import { AbstractLocationService } from './services/location/abstract-location.service';
import { GradientBackgroundDirective } from './directives/bgGradient/gradient-background.directive';
import {AverageTemperatureService} from './services/averageTemperature/average-temperature.service';
import {AbstractWeatherApiService} from './services/weather-api/abstract-weather-api-service';
import {WeatherApiData} from './services/weather-api/weather-api-response';

const defaultAverageTemp: WeatherCardData = { title: '', temperatureValue: 0 };
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(GradientBackgroundDirective) directive!: GradientBackgroundDirective;
  subscriptions: Subscription[] = [];
  nextWeekForecast: WeatherCardData[] = [];
  averageTempForecast$: Observable<WeatherCardData> = of(defaultAverageTemp);
  loadingWeatherData: boolean = false;
  countries: string[] = [];

  constructor(
    private weatherProvider: AbstractWeatherProviderService,
    private locationService: AbstractLocationService,
    private averageTempService: AverageTemperatureService,
    private weatherApiService: AbstractWeatherApiService
  ) {}

  ngOnInit(): void {
    // Todo: Change to reactive version
    this.countries = this.locationService.getAvailableCountries();

    this.averageTempForecast$ = this.averageTempService.get().pipe(
      tap((data: WeatherCardData) => {
        this.loadingWeatherData = false;
        this.updateBackgroundGradient(data);
      }));
      // .subscribe((data: WeatherCardData) => {
      //   this.averageTempForecast = data;
      //   this.updateBackgroundGradient(data);
      // }),
    this.subscriptions.push(
      this.weatherProvider.getNextSevenDaysTemperature()
        .subscribe((data: WeatherCardData[]) => {
          this.nextWeekForecast = data;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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
