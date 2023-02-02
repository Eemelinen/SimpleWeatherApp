/// <reference path="../../../../types.d.ts" />

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageTemperatureCardComponent } from './average-temperature-card.component';
import {mockForecasts} from '../../../mocks/mock-forecasts';

describe('AverageTemperatureCardComponent', () => {
  let component: AverageTemperatureCardComponent;
  let fixture: ComponentFixture<AverageTemperatureCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AverageTemperatureCardComponent,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AverageTemperatureCardComponent);
    component = fixture.componentInstance;
    component.forecasts = mockForecasts;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the average temperature', () => {
    expect(component.calculateAverageTemperature(component.forecasts)).toEqual(4);
  });


  it('getDates should give a correctly formatted result', () => {
    component.forecasts[0].date = '2023-02-02';
    expect(component.getDates()).toEqual('FEB 2 - 11 2023');
  });

  it('getDates should give a correctly formatted result when the year changes', () => {
    component.forecasts[0].date = '2021-02-02';
    expect(component.getDates()).toEqual('FEB 2, 2021 - FEB 11 2023');
  });

  it('getDates should give a correctly formatted result when the month changes', () => {
    component.forecasts[0].date = '2023-01-31';
    expect(component.getDates()).toEqual('JAN 31 - FEB 11 2023');
  });

});
