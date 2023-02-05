/// <reference path="../../../../types.d.ts" />

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTemperatureCardComponent } from './daily-temperature-card.component';
import {mockForecasts} from '../../../mocks/mock-forecasts';

describe('DailyTemperatureCardComponent', () => {
  let component: DailyTemperatureCardComponent;
  let fixture: ComponentFixture<DailyTemperatureCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyTemperatureCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyTemperatureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
