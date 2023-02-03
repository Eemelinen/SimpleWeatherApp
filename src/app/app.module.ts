import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AverageTemperatureCardComponent } from './components/average-temperature-card/average-temperature-card.component';
import { DailyTemperatureCardComponent } from './components/daily-temperature-card/daily-temperature-card.component';
import { LocationPickerFormComponent } from './components/location-picker-form/location-picker-form.component';
import { BgGradientDirective } from './directives/bg-gradient/bg-gradient.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AbstractWeatherProviderService } from './services/weather-provider/abstract-weather-provider.service';
import { WeatherProviderService } from './services/weather-provider/weather-provider.service';
import { MockWeatherProviderService } from './services/weather-provider/mock-weather-provider.service';

const production = [
  { provide: AbstractWeatherProviderService, useClass: WeatherProviderService }
];

const test = [
  { provide: AbstractWeatherProviderService, useClass: MockWeatherProviderService }
];

@NgModule({
  declarations: [
    AppComponent,
    AverageTemperatureCardComponent,
    DailyTemperatureCardComponent,
    LocationPickerFormComponent,
    BgGradientDirective,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    // ...test,
    ...production
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
