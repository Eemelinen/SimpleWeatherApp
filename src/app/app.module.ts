import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LocationPickerComponent } from './components/location-picker/location-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AbstractLocationService } from './services/location/abstract-location.service';
import { LocationService } from './services/location/location.service';
import { GradientBackgroundDirective } from './directives/bgGradient/gradient-background.directive';
import { CustomSelectComponent } from './components/generics/custom-select/custom-select.component';
import { ClickOutsideDirective } from './directives/clickOutside/click-outside.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormComponent } from './components/generics/reactive-form/reactive-form.component';
import { AbstractWeatherApiService } from './services/weather-api/abstract-weather-api-service';
import { WeatherApiService } from './services/weather-api/weather-api.service';
import { SmallWeatherCardComponent } from './components/small-weather-card/small-weather-card.component';
import { AbstractAverageTemperatureService } from './services/average-temperature/abstract-average-temperature.service';
import { AverageTemperatureService } from './services/average-temperature/average-temperature.service';
import { AbstractNextWeekWeatherService } from './services/next-week-weather/abstract-next-week-weather.service';
import { NextWeekWeatherService } from './services/next-week-weather/next-week-weather.service';
import { ExtraDataCardComponent } from './components/extra-data-card/extra-data-card.component';
import { MultiDayForecastComponent } from './components/multi-day-forecast/multi-day-forecast.component';
import { GraphContainerComponent } from './components/graph-container/graph-container.component';
import { ExtraDataContainerComponent } from './components/extra-data-container/extra-data-container.component';
import { HorizontalTemperatureCardComponent } from './components/horizontal-temperature-card/horizontal-temperature-card.component';
import { OneDayForecastService } from './services/one-day-forecast/one-day-forecast.service';
import { AbstractMultiDayForecastService } from './services/multi-day-forecast/abstract-multi-day-forecast.service';
import { MultiDayForecastService } from './services/multi-day-forecast/multi-day-forecast.service';
import { OneDayForecastComponent } from './components/one-day-forecast/one-day-forecast.component';
import { AbstractOneDayForecastService } from './services/one-day-forecast/abtract-forecast-today.service';

const production = [
  { provide: AbstractLocationService, useClass: LocationService },
  { provide: AbstractWeatherApiService, useClass: WeatherApiService },
  { provide: AbstractAverageTemperatureService, useClass: AverageTemperatureService },
  { provide: AbstractNextWeekWeatherService, useClass: NextWeekWeatherService },
  { provide: AbstractOneDayForecastService, useClass: OneDayForecastService },
  { provide: AbstractMultiDayForecastService, useClass: MultiDayForecastService }
];

@NgModule({
  declarations: [
    AppComponent,
    LocationPickerComponent,
    GradientBackgroundDirective,
    CustomSelectComponent,
    ClickOutsideDirective,
    ReactiveFormComponent,
    SmallWeatherCardComponent,
    OneDayForecastComponent,
    ExtraDataCardComponent,
    MultiDayForecastComponent,
    GraphContainerComponent,
    ExtraDataContainerComponent,
    HorizontalTemperatureCardComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [
    ...production,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
