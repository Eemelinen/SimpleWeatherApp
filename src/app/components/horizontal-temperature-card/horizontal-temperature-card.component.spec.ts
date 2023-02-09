import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalTemperatureCardComponent } from './horizontal-temperature-card.component';

describe('HorizontalTemperatureCardComponent', () => {
  let component: HorizontalTemperatureCardComponent;
  let fixture: ComponentFixture<HorizontalTemperatureCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalTemperatureCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalTemperatureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
