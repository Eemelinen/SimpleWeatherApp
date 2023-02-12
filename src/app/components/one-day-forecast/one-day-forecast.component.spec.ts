import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OneDayForecastComponent } from './one-day-forecast.component';
import { MockComponents } from 'ng-mocks';
import { HorizontalTemperatureCardComponent } from '../horizontal-temperature-card/horizontal-temperature-card.component';
import { ExtraDataContainerComponent } from '../extra-data-container/extra-data-container.component';
import { ExtraDataCardComponent } from '../extra-data-card/extra-data-card.component';
import { mockStoredWeatherData } from '../../../assets/mocks/mock-weather-data';
import { AbstractOneDayForecastService } from '../../services/one-day-forecast/abtract-forecast-today.service';
import { of } from 'rxjs';

const currentDayForecast = JSON.parse(JSON.stringify(mockStoredWeatherData));
const weatherData = currentDayForecast.data[0];
currentDayForecast.data = [weatherData];

export const mockGetOneDayForecastRes: OneDayForecast = {
  city_name: 'Toronto',
  temperature: 9,
  weatherDescription: 'Clear sky',
  weatherIcon: 'c01d',
  wind_spd: 2.57,
  rh: 93,
  uv: 1,
}

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
          HorizontalTemperatureCardComponent,
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

    oneDayForecastServiceSpy.get.and.returnValue(of(mockGetOneDayForecastRes));
    fixture = TestBed.createComponent(OneDayForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
