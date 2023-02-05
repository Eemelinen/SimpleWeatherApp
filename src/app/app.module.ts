import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AverageTemperatureCardComponent } from './components/average-temperature-card/average-temperature-card.component';
import { DailyTemperatureCardComponent } from './components/daily-temperature-card/daily-temperature-card.component';
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

const production = [
  { provide: AbstractWeatherProviderService, useClass: WeatherProviderService },
  { provide: AbstractLocationService, useClass: LocationService },
  { provide: AbstractWeatherApiService, useClass: WeatherApiService },
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
    LocationPickerComponent,
    GradientBackgroundDirective,
    CustomSelectComponent,
    ClickOutsideDirective,
    ReactiveFormComponent,
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
