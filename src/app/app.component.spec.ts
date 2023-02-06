/// <reference path="../../types.d.ts" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LocationPickerComponent } from './components/location-picker/location-picker.component';
import { MockComponents } from 'ng-mocks';
import { mockForecasts } from '../mocks/mock-forecasts';
import { AbstractLocationService } from './services/location/abstract-location.service';
import { MockLocationService } from './services/location/mock-location.service';
import { TemperatureCardComponent } from './components/temperature-card/temperature-card.component';
import { of } from 'rxjs';
import { AbstractAverageTemperatureService } from './services/average-temperature/abstract-average-temperature.service';
import { AbstractNextWeekWeatherService } from './services/next-week-weather/abstract-next-week-weather.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponents(
          TemperatureCardComponent,
          LocationPickerComponent
        ),
      ],
      providers: [
        {
          provide: AbstractLocationService,
          useClass: MockLocationService
        },
        {
          provide: AbstractAverageTemperatureService,
          useValue: {
            get: () => of(mockForecasts[0])
          }
        },
        {
          provide: AbstractNextWeekWeatherService,
          useValue: {
            get: () => {
              return of(mockForecasts)
            }
          }
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a section with class location-selection', () => {
    expect(fixture.nativeElement.querySelector('section.location-selection')).toBeTruthy();
  });

  it('Should NOT show average-temperature if NO weather data is available', () => {
    component.averageTempForecast$ = of({ title: '', temperatureValue: 0 });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('section.average-temperature')).toEqual(null);
  });

  it('Should NOT show next-week-temperatures if no weather data is available', () => {
    component.nextWeekForecast$ = of([]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('section.next-week-temperatures')).toEqual(null);
  });

  it('should have a section with class next-week-temperatures if averageTempForecast$ has resolved',() => {
    expect(fixture.nativeElement.querySelector('.next-week-temperatures')).toBeTruthy();
  });

  it('should have a section with class average-temperature if averageTemp is available and has a title', () => {
    expect(fixture.nativeElement.querySelector('.average-temperature')).toBeTruthy();
  });
});
