/// <reference path="../../types.d.ts" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LocationPickerComponent } from './components/location-picker/location-picker.component';
import { MockComponents } from 'ng-mocks';
import { AbstractLocationService } from './services/location/abstract-location.service';
import { MockLocationService } from './services/location/mock-location.service';
import { of } from 'rxjs';
import { OneDayForecastComponent } from './components/one-day-forecast/one-day-forecast.component';
import { MultiDayForecastComponent } from './components/multi-day-forecast/multi-day-forecast.component';
import { mockMultiDayForecast } from '../assets/mocks/mock-multi-day-forecast';
import { AbstractMultiDayForecastService } from './services/multi-day-forecast/abstract-multi-day-forecast.service';
import { AbstractLoadingService } from './services/loading/abstract-loading-service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let multiDayForecastServiceSpy: jasmine.SpyObj<AbstractMultiDayForecastService>;
  let loadingServiceSpy: jasmine.SpyObj<AbstractLoadingService>;

  beforeEach(async () => {
    loadingServiceSpy = jasmine.createSpyObj('AbstractLoadingService', ['getLoading']);
    multiDayForecastServiceSpy = jasmine.createSpyObj('AbstractMultiDayForecastService', ['get']);

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponents(
          LocationPickerComponent,
          OneDayForecastComponent,
          MultiDayForecastComponent
        ),
      ],
      providers: [
        {
          provide: AbstractLocationService,
          useClass: MockLocationService
        },
        {
          provide: AbstractMultiDayForecastService,
          useValue: multiDayForecastServiceSpy
        },
        {
          provide: AbstractLoadingService,
          useValue: loadingServiceSpy
        }
      ]
    }).compileComponents();

    multiDayForecastServiceSpy.get.and.returnValue(of(mockMultiDayForecast));
    loadingServiceSpy.getLoading.and.returnValue(of(false));
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render a location-picker component', () => {
    pending();
  });

  it('should render a one-day-forecast component', () => {
    pending();
  });

  it('should render a multi-day-forecast component', () => {
    pending();
  });
});
