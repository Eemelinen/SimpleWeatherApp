import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LocationPickerComponent } from './components/location-picker/location-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AbstractWeatherProviderService } from './services/weather-provider/abstract-weather-provider.service';
import { WeatherProviderService } from './services/weather-provider/weather-provider.service';
import { MockWeatherProviderService } from './services/weather-provider/mock-weather-provider.service';
import { AbstractLocationService } from './services/location/abstract-location.service';
import { LocationService } from './services/location/location.service';
import { MockLocationService } from './services/location/mock-location.service';
import { GradientBackgroundDirective } from './directives/bgGradient/gradient-background.directive';
import { CustomSelectComponent } from './components/generics/custom-select/custom-select.component';
import { ClickOutsideDirective } from './directives/clickOutside/click-outside.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormComponent } from './components/generics/reactive-form/reactive-form.component';
import { AbstractWeatherApiService } from './services/weather-api/abstract-weather-api-service';
import { WeatherApiService } from './services/weather-api/weather-api.service';
import { TemperatureCardComponent } from './components/temperature-card/temperature-card.component';
import { AbstractAverageTemperatureService } from './services/average-temperature/abstract-average-temperature.service';
import { AverageTemperatureService } from './services/average-temperature/average-temperature.service';
import { AbstractNextWeekWeatherService } from './services/next-week-weather/abstract-next-week-weather.service';
import { NextWeekWeatherService } from './services/next-week-weather/next-week-weather.service';

const production = [
  { provide: AbstractWeatherProviderService, useClass: WeatherProviderService },
  { provide: AbstractLocationService, useClass: LocationService },
  { provide: AbstractWeatherApiService, useClass: WeatherApiService },
  { provide: AbstractAverageTemperatureService, useClass: AverageTemperatureService },
  { provide: AbstractNextWeekWeatherService, useClass: NextWeekWeatherService },
];

const test = [
  { provide: AbstractWeatherProviderService, useClass: MockWeatherProviderService },
  { provide: AbstractLocationService, useClass: MockLocationService },
];

@NgModule({
  declarations: [
    AppComponent,
    LocationPickerComponent,
    GradientBackgroundDirective,
    CustomSelectComponent,
    ClickOutsideDirective,
    ReactiveFormComponent,
    TemperatureCardComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [
    // ...test,
    ...production,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
