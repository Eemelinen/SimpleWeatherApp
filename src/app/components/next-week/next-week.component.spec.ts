import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NextWeekComponent } from './next-week.component';
import { MockComponents } from 'ng-mocks';
import { SmallWeatherCardComponent } from '../small-weather-card/small-weather-card.component';
import { GraphContainerComponent } from '../graph-container/graph-container.component';
import { ExtraDataCardComponent } from '../extra-data-card/extra-data-card.component';
import { ExtraDataContainerComponent } from '../extra-data-container/extra-data-container.component';

describe('NextWeekComponent', () => {
  let component: NextWeekComponent;
  let fixture: ComponentFixture<NextWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NextWeekComponent,
        MockComponents(
          SmallWeatherCardComponent,
          GraphContainerComponent,
          ExtraDataCardComponent,
          ExtraDataContainerComponent
        )
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
