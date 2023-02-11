import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OneDayWeatherComponent } from './one-day-weather.component';
import { MockComponents } from 'ng-mocks';
import { HorizontalTemperatureCardComponent } from '../horizontal-temperature-card/horizontal-temperature-card.component';
import { ExtraDataContainerComponent } from '../extra-data-container/extra-data-container.component';
import { ExtraDataCardComponent } from '../extra-data-card/extra-data-card.component';
import { AbstractOneDayWeatherService } from '../../services/weather-today/abtract-weather-today.service';
import { of } from 'rxjs';
import { mockStoredWeatherData } from '../../../mocks/mock-weather-data';

const currentDayForecast = JSON.parse(JSON.stringify(mockStoredWeatherData));
const weatherData = currentDayForecast.data[0];
currentDayForecast.data = [weatherData];

describe('WeatherTodayComponent', () => {
  let component: OneDayWeatherComponent;
  let fixture: ComponentFixture<OneDayWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        OneDayWeatherComponent,
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

    fixture = TestBed.createComponent(OneDayWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
