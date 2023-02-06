import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { AbstractLocationService } from './services/location/abstract-location.service';
import { GradientBackgroundDirective } from './directives/bgGradient/gradient-background.directive';
import { AbstractWeatherApiService } from './services/weather-api/abstract-weather-api-service';
import { AbstractAverageTemperatureService } from './services/average-temperature/abstract-average-temperature.service';
import { AbstractNextWeekWeatherService } from './services/next-week-weather/abstract-next-week-weather.service';

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
    this.loadingWeatherData = true;
    this.weatherApiService.updateWeatherData(location);
  }

  private updateBackgroundGradient(data: WeatherCardData): void {
    if (data.title) {
      this.directive.changeEndpointColor(data.temperatureValue);
    }
  }
}
