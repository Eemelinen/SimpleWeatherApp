import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {DailyTemperatureCardComponent} from './components/daily-temperature-card/daily-temperature-card.component';
import {
  AverageTemperatureCardComponent
} from './components/average-temperature-card/average-temperature-card.component';
import {LocationPickerFormComponent} from './components/location-picker-form/location-picker-form.component';

describe('AppComponent', () => {

  // Todo Mock components
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DailyTemperatureCardComponent,
        AverageTemperatureCardComponent,
        LocationPickerFormComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
