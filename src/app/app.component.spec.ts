import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DailyTemperatureCardComponent } from './components/daily-temperature-card/daily-temperature-card.component';
import {
  AverageTemperatureCardComponent
} from './components/average-temperature-card/average-temperature-card.component';
import { LocationPickerFormComponent } from './components/location-picker-form/location-picker-form.component';
import { MockComponents } from 'ng-mocks';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponents(
          DailyTemperatureCardComponent,
          AverageTemperatureCardComponent,
          LocationPickerFormComponent
        ),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.weatherData = [];
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a section with class section-location', () => {
    expect(fixture.nativeElement.querySelector('section.section-location')).toBeTruthy();
  });

  it('Should NOT show section-temp-average if no weather data is available', () => {
    expect(fixture.nativeElement.querySelector('section.section-temp-average')).toEqual(null);
  });

  it('should have a section with class section-temp-average if weather data is available', () => {
    component.weatherData = ['testdata'];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('section.section-temp-average')).toBeTruthy();
  });

  it('Should NOT show section-temps-weekly if no weather data is available', () => {
    expect(fixture.nativeElement.querySelector('section.section-temps-weekly')).toEqual(null);
  });

  it('should have a section with class section-temps-weekly if weather data is available', () => {
    component.weatherData = ['testdata'];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('section.section-temps-weekly')).toBeTruthy();
  });
});
