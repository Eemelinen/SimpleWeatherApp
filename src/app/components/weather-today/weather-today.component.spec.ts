import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherTodayComponent } from './weather-today.component';
import { MockComponents } from 'ng-mocks';
import { HorizontalTemperatureCardComponent } from '../horizontal-temperature-card/horizontal-temperature-card.component';
import { ExtraDataContainerComponent } from '../extra-data-container/extra-data-container.component';
import { GraphContainerComponent } from '../graph-container/graph-container.component';
import { ExtraDataCardComponent } from '../extra-data-card/extra-data-card.component';

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
