import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigWeatherCardComponent } from './big-weather-card.component';

fdescribe('HorizontalTemperatureCardComponent', () => {
  let component: BigWeatherCardComponent;
  let fixture: ComponentFixture<BigWeatherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigWeatherCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigWeatherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
