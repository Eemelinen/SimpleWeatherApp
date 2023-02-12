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
import { EnvironmentService } from '../../services/environment/environment.service';
import { emptyOneDayWeather } from './empty-one-day-weather';

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
        {
          provide: EnvironmentService,
          useValue: {
            weather_icon_folder: 'test/',
          }
        }
      ]
    })
    .compileComponents();

    oneDayForecastServiceSpy.get.and.returnValue(of(mockOneDayForecast));
    fixture = TestBed.createComponent(OneDayForecastComponent);
    component = fixture.componentInstance;
    component.subHeader = 'test subheader';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('subscribing to weatherData$ should return a valid OneDayForecast', () => {
    component.weatherData$.subscribe((data) => {
      expect(data.city_name).toEqual(mockOneDayForecast['city_name']);
      expect(data.temperature).toEqual(mockOneDayForecast['temperature']);
      expect(data.weatherDescription).toEqual(mockOneDayForecast['weatherDescription']);
      expect(data.extraData.length).toEqual(3);
      expect(data.weatherIconUrl).toEqual('test/c01d.png');
    });
  });

  it('should not have div with class one-day-weather if city_name is falsy', () => {
    component.weatherData$ = of({...emptyOneDayWeather});
    fixture.detectChanges();
    const oneDayWeather = fixture.nativeElement.querySelector('.one-day-weather');
    expect(oneDayWeather).toBeFalsy();
  });

  it('should have a subHeader', () => {
    const subHeader = fixture.nativeElement.querySelector('.subheader');
    expect(subHeader.textContent).toEqual(component.subHeader);
  });

  it('should have an element with class header that contains the city name', () => {
    const header = fixture.nativeElement.querySelector('.header');
    expect(header.textContent).toEqual(mockOneDayForecast.city_name);
  });

  it('should have a BigWeatherCardComponent', () => {
    const bigWeatherCard = fixture.nativeElement.querySelector('big-weather-card');
    expect(bigWeatherCard).toBeTruthy();
  });

  it('should have an ExtraDataContainerComponent', () => {
    const extraDataContainer = fixture.nativeElement.querySelector('extra-data-container');
    expect(extraDataContainer).toBeTruthy();
  });

  it('should have an 3 ExtraDataCardComponents', () => {
    const extraDataCards = fixture.nativeElement.querySelectorAll('extra-data-card');
    expect(extraDataCards.length).toEqual(3);
  });
});
