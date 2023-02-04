import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AverageTemperatureCardComponent } from './components/average-temperature-card/average-temperature-card.component';
import { DailyTemperatureCardComponent } from './components/daily-temperature-card/daily-temperature-card.component';
import { LocationPickerFormComponent } from './components/location-picker-form/location-picker-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AbstractWeatherProviderService } from './services/weather-provider/abstract-weather-provider.service';
import { WeatherProviderService } from './services/weather-provider/weather-provider.service';
import { MockWeatherProviderService } from './services/weather-provider/mock-weather-provider.service';
import { AbstractLocationService } from './services/location/abstract-location.service';
import { LocationService } from './services/location/location.service';
import { MockLocationService } from './services/location/mock-location.service';
import { GradientBackgroundDirective } from './directives/bg-gradient/gradient-background.directive';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { ClickOutsideDirective } from './directives/clickOutside/click-outside.directive';
import { WeatherDataLoadingInterceptor } from './interceptors/weather-data-loading.interceptor';

const production = [
  { provide: AbstractWeatherProviderService, useClass: WeatherProviderService },
  { provide: AbstractLocationService, useClass: LocationService },
];

const test = [
  { provide: AbstractWeatherProviderService, useClass: MockWeatherProviderService },
  { provide: AbstractLocationService, useClass: MockLocationService },
];

@NgModule({
  declarations: [
    AppComponent,
    AverageTemperatureCardComponent,
    DailyTemperatureCardComponent,
    LocationPickerFormComponent,
    GradientBackgroundDirective,
    CustomSelectComponent,
    ClickOutsideDirective,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    // ...test,
    ...production,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WeatherDataLoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
