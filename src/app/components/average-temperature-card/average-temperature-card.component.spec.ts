import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageTemperatureCardComponent } from './average-temperature-card.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AverageTemperatureCardComponent', () => {
  let component: AverageTemperatureCardComponent;
  let fixture: ComponentFixture<AverageTemperatureCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AverageTemperatureCardComponent,
      ],
      imports: [
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AverageTemperatureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive a day string and render it correctly', () => {
    pending();
  });

  it('should receive a temperature and render it correctly.', () => {
    pending();
  });
});
