import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherTodayComponent } from './weather-today.component';
import { MockComponents } from 'ng-mocks';
import { HorizontalTemperatureCardComponent } from '../horizontal-temperature-card/horizontal-temperature-card.component';
import { ExtraDataContainerComponent } from '../extra-data-container/extra-data-container.component';
import { ExtraDataCardComponent } from '../extra-data-card/extra-data-card.component';
import { AbstractWeatherTodayService } from '../../services/weather-today/abtract-weather-today.service';
import { of } from 'rxjs';
import { mockStoredWeatherData } from '../../../mocks/mock-weather-data';

const currentDayForecast = JSON.parse(JSON.stringify(mockStoredWeatherData));
const weatherData = currentDayForecast.data[0];
currentDayForecast.data = [weatherData];

describe('WeatherTodayComponent', () => {
  let component: WeatherTodayComponent;
  let fixture: ComponentFixture<WeatherTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WeatherTodayComponent,
        MockComponents(
          HorizontalTemperatureCardComponent,
          ExtraDataContainerComponent,
          ExtraDataCardComponent,
        )
      ],
      providers: [
        {
          provide: AbstractWeatherTodayService,
          useValue: {
            get: () => of(currentDayForecast)
          }
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
