import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OneDayForecastComponent } from './one-day-forecast.component';
import { MockComponents } from 'ng-mocks';
import { HorizontalTemperatureCardComponent } from '../horizontal-temperature-card/horizontal-temperature-card.component';
import { ExtraDataContainerComponent } from '../extra-data-container/extra-data-container.component';
import { ExtraDataCardComponent } from '../extra-data-card/extra-data-card.component';
import { AbstractOneDayWeatherService } from '../../services/one-day-weather/abtract-weather-today.service';
import { of } from 'rxjs';
import { mockStoredWeatherData } from '../../../mocks/mock-weather-data';

const currentDayForecast = JSON.parse(JSON.stringify(mockStoredWeatherData));
const weatherData = currentDayForecast.data[0];
currentDayForecast.data = [weatherData];

describe('OneDayForecast', () => {
  let component: OneDayForecastComponent;
  let fixture: ComponentFixture<OneDayForecastComponent>;

  beforeEach(async () => {
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
          provide: AbstractOneDayWeatherService,
          useValue: {
            get: () => of(currentDayForecast)
          }
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneDayForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
