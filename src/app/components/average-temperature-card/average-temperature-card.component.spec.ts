/// <reference path="../../../../types.d.ts" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AverageTemperatureCardComponent } from './average-temperature-card.component';
import { mockForecasts } from '../../../mocks/mock-forecasts';

const inputTemperature = 10;

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
    component.forecasts = JSON.parse(JSON.stringify(mockForecasts));
    component.temperature = inputTemperature;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render time period if time period is received', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.info').textContent).toContain('FEB 2 - 11 2023');
  });

  it('should render temperature if its unit if received', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.temp-container').textContent).toContain(`${inputTemperature}°C`);
  });

  // Todo: Move test below to service

  it('getDates should give a correctly formatted result', () => {
    pending();
    component.forecasts[0].date = '2023-02-02';
    // expect(component.getDates()).toEqual('FEB 2 - 11 2023');
  });

  it('getDates should give a correctly formatted result when the year changes', () => {
    pending();
    component.forecasts[0].date = '2021-02-02';
    // expect(component.getDates()).toEqual('FEB 2, 2021 - FEB 11 2023');
  });

  it('getDates should give a correctly formatted result when the month changes', () => {
    pending();
    component.forecasts[0].date = '2023-01-31';
    // expect(component.getDates()).toEqual('JAN 31 - FEB 11 2023');
  });


});
