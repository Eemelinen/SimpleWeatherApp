import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OneDayForecastComponent } from './one-day-forecast.component';
import { MockComponents } from 'ng-mocks';
import { BigWeatherCardComponent } from '../big-weather-card/big-weather-card.component';
import { ExtraDataContainerComponent } from '../extra-data-container/extra-data-container.component';
import { ExtraDataCardComponent } from '../extra-data-card/extra-data-card.component';
import { mockStoredWeatherData } from '../../../assets/mocks/mock-weather-data';
import { AbstractOneDayForecastService } from '../../services/one-day-forecast/abtract-forecast-today.service';
import { of } from 'rxjs';
import { mockOneDayForecast } from '../../../assets/mocks/mock-one-day-forecast';

const currentDayForecast = JSON.parse(JSON.stringify(mockStoredWeatherData));
const weatherData = currentDayForecast.data[0];
currentDayForecast.data = [weatherData];

describe('OneDayForecast', () => {
  let component: OneDayForecastComponent;
  let fixture: ComponentFixture<OneDayForecastComponent>;
  let oneDayForecastServiceSpy: jasmine.SpyObj<AbstractOneDayForecastService>;

  beforeEach(async () => {
    oneDayForecastServiceSpy = jasmine.createSpyObj('AbstractOneDayForecastService', ['get']);

    await TestBed.configureTestingModule({
      declarations: [
        OneDayForecastComponent,
        MockComponents(
          BigWeatherCardComponent,
          ExtraDataContainerComponent,
          ExtraDataCardComponent,
        )
      ],
      providers: [
        {
          provide: AbstractOneDayForecastService,
          useValue: oneDayForecastServiceSpy
        },
      ]
    })
    .compileComponents();

    oneDayForecastServiceSpy.get.and.returnValue(of(mockOneDayForecast));
    fixture = TestBed.createComponent(OneDayForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
