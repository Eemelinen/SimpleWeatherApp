import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiDayForecastComponent } from './multi-day-forecast.component';
import { MockComponents } from 'ng-mocks';
import { SmallWeatherCardComponent } from '../small-weather-card/small-weather-card.component';
import { GraphContainerComponent } from '../graph-container/graph-container.component';
import { ExtraDataCardComponent } from '../extra-data-card/extra-data-card.component';
import { ExtraDataContainerComponent } from '../extra-data-container/extra-data-container.component';
import { AbstractOneDayForecastService } from '../../services/one-day-forecast/abtract-forecast-today.service';

describe('MultiDayForecastComponent', () => {
  let component: MultiDayForecastComponent;
  let fixture: ComponentFixture<MultiDayForecastComponent>;
  let oneDayForecastServiceSpy: jasmine.SpyObj<AbstractOneDayForecastService>;

  beforeEach(async () => {
    oneDayForecastServiceSpy = jasmine.createSpyObj('AbstractOneDayForecastService', ['getCurrentForecast']);

    await TestBed.configureTestingModule({
      declarations: [
        MultiDayForecastComponent,
        MockComponents(
          SmallWeatherCardComponent,
          GraphContainerComponent,
          ExtraDataCardComponent,
          ExtraDataContainerComponent
        )
      ],
      providers: [
        {
          provide: AbstractOneDayForecastService,
          useValue: oneDayForecastServiceSpy
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiDayForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Todo: Saved from old average-temp service
  // it('get method should return a valid weatherCardData observable', () => {
  //   weatherApiServiceSpy.getCurrentForecast.and.returnValue(of(mockStoredWeatherData));
  //
  //   service.get().subscribe((res) => {
  //     expect(res).toEqual({
  //       date: 'FEB 2 - 3 2023',
  //       temperature: 9,
  //     });
  //   });
  // });
});
