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
import {EnvironmentService} from '../../services/environment/environment.service';

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
        },
        {
          provide: EnvironmentService,
          useValue: {
            extra_data_icon_folder: 'test/',
          }
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

  it('should call get method of multiDayForecastService', () => {
      expect(multiDayForecastServiceSpy.get).toHaveBeenCalledTimes(1);
  });

  it('data returned by service should be set to correct format', () => {
    component.forecast$.subscribe((data) => {
      expect(data.forecasts.length).toEqual(7);
      expect(data.forecasts[0].temperature).toEqual(10);
      expect(data.averages.length).toEqual(2);
      expect(data.averages[0].title).toEqual('Avg. Temp');
      expect(data.averages[0].value).toEqual('10.3°C');
      expect(data.averages[1].title).toEqual('Diff. Temp');
      expect(data.averages[0].imgUrl).toEqual('test/thermometer.png');
    });
  });

  it('should render header', () => {
    const header = fixture.nativeElement.querySelector('.header');
    expect(header.textContent).toContain(component.header);
  });

  it('should render small weather cards', () => {
    const smallWeatherCards = fixture.nativeElement.querySelectorAll('small-weather-card');
    expect(smallWeatherCards.length).toEqual(7);
  });

  it('should render graph container', () => {
    const graphContainer = fixture.nativeElement.querySelector('graph-container');
    expect(graphContainer).toBeTruthy();
  });

  it('should render extra data container', () => {
    const extraDataContainer = fixture.nativeElement.querySelector('extra-data-container');
    expect(extraDataContainer).toBeTruthy();
  });

  it('should render extra data cards', () => {
    const extraDataCards = fixture.nativeElement.querySelectorAll('extra-data-card');
    expect(extraDataCards.length).toEqual(2);
  });

  it('should not render graph container if showGraph is false', () => {
    component.showGraph = false;
    fixture.detectChanges();
    const graphContainer = fixture.nativeElement.querySelector('graph-container');
    expect(graphContainer).toBeFalsy();
  });

  it('should not render extra data container if showAverages is false', () => {
    component.showAverages = false;
    fixture.detectChanges();
    const extraDataContainer = fixture.nativeElement.querySelector('extra-data-container');
    expect(extraDataContainer).toBeFalsy();
  });

});
