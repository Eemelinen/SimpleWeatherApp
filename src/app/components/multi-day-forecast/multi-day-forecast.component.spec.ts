import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiDayForecastComponent } from './multi-day-forecast.component';
import { MockComponents } from 'ng-mocks';
import { SmallWeatherCardComponent } from '../small-weather-card/small-weather-card.component';
import { GraphContainerComponent } from '../graph-container/graph-container.component';
import { ExtraDataCardComponent } from '../extra-data-card/extra-data-card.component';
import { ExtraDataContainerComponent } from '../extra-data-container/extra-data-container.component';
import { AbstractMultiDayForecastService } from '../../services/multi-day-forecast/abstract-multi-day-forecast.service';
import { of } from 'rxjs';
import { mockMultiDayForecast } from '../../../assets/mocks/mock-multi-day-forecast';

describe('MultiDayForecastComponent', () => {
  let component: MultiDayForecastComponent;
  let fixture: ComponentFixture<MultiDayForecastComponent>;
  let multiDayForecastServiceSpy: jasmine.SpyObj<AbstractMultiDayForecastService>;

  beforeEach(async () => {
    multiDayForecastServiceSpy = jasmine.createSpyObj('AbstractMultiDayForecastService', ['get']);

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
          provide: AbstractMultiDayForecastService,
          useValue: multiDayForecastServiceSpy
        }
      ]
    })
    .compileComponents();

    multiDayForecastServiceSpy.get.and.returnValue(of(mockMultiDayForecast));
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
