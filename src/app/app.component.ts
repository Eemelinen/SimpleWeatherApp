import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { AbstractWeatherProviderService } from './services/weather-provider/abstract-weather-provider.service';
import { AbstractLocationService } from './services/location/abstract-location.service';
import { GradientBackgroundDirective } from './directives/bgGradient/gradient-background.directive';
import {AverageTemperatureService} from './services/averageTemperature/average-temperature.service';
import {AbstractWeatherApiService} from './services/weather-api/abstract-weather-api-service';
import {WeatherApiData} from './services/weather-api/weather-api-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(GradientBackgroundDirective) directive!: GradientBackgroundDirective;
  subscriptions: Subscription[] = [];
  nextWeekForecast: WeatherCardData[] = [];
  averageTempForecast: WeatherCardData = { title: '', temperatureValue: 0 };
  loadingWeatherData: boolean = false;

  constructor(
    private weatherProvider: AbstractWeatherProviderService,
    private locationService: AbstractLocationService,
    private averageTempService: AverageTemperatureService,
    private weatherApiService: AbstractWeatherApiService
  ) {}

  ngOnInit(): void {
    // Todo: Change to reactive version
    this.subscriptions.push(

      this.averageTempService.get().subscribe((data: WeatherCardData) => {
        console.log('data', data)
        this.averageTempForecast = data;
        this.updateBackgroundGradient(data);
      }),

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
    this.loadingWeatherData = true;


    this.subscriptions.push(
      this.weatherApiService.getWeatherData(location).subscribe()
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
