import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AverageTemperatureCardComponent } from './components/average-temperature-card/average-temperature-card.component';
import { DailyTemperatureCardComponent } from './components/daily-temperature-card/daily-temperature-card.component';
import { LocationPickerFormComponent } from './components/location-picker-form/location-picker-form.component';
import { BgGradientDirective } from './directives/bg-gradient/bg-gradient.directive';
import { ReactiveFormsModule } from '@angular/forms';

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
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
