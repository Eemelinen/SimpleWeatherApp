import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LocationPickerComponent } from './components/location-picker/location-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { ExtraDataCardComponent } from './components/generics/extra-data-card/extra-data-card.component';
import { MultiDayForecastComponent } from './components/multi-day-forecast/multi-day-forecast.component';
import { GraphContainerComponent } from './components/generics/graph-container/graph-container.component';
import { ExtraDataContainerComponent } from './components/generics/extra-data-container/extra-data-container.component';
import { BigWeatherCardComponent } from './components/big-weather-card/big-weather-card.component';
import { OneDayForecastService } from './services/one-day-forecast/one-day-forecast.service';
import { AbstractMultiDayForecastService } from './services/multi-day-forecast/abstract-multi-day-forecast.service';
import { MultiDayForecastService } from './services/multi-day-forecast/multi-day-forecast.service';
import { OneDayForecastComponent } from './components/one-day-forecast/one-day-forecast.component';
import { AbstractOneDayForecastService } from './services/one-day-forecast/abtract-forecast-today.service';
import { AbstractLoadingService } from './services/loading/abstract-loading-service';
import { LoadingService } from './services/loading/loading-service';
import { WeatherDataInterceptor } from './interceptors/weather-data.interceptor';
import { GlobalErrorHandlerService } from './services/error-handling/global-error-handler.service';
import {
  AbstractDatesToStringService
} from './services/date-range-formatter/abstract-dates-to-string.service';
import {
  DatesToStringService
} from './services/date-range-formatter/dates-to-string.service';
import { environment } from '../environments/environment';

const providers = [
  { provide: AbstractDatesToStringService, useClass: DatesToStringService },
  { provide: AbstractLocationService, useClass: LocationService },
  { provide: AbstractWeatherApiService, useClass: WeatherApiService },
  { provide: AbstractOneDayForecastService, useClass: OneDayForecastService },
  { provide: AbstractMultiDayForecastService, useClass: MultiDayForecastService },
  { provide: AbstractLoadingService, useClass: LoadingService },
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
    BigWeatherCardComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [
    [
      ...providers,
      environment.providers,
    ],
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WeatherDataInterceptor,
      multi: true,
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
