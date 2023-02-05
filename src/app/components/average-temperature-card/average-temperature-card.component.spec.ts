/// <reference path="../../../../types.d.ts" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AverageTemperatureCardComponent } from './average-temperature-card.component';

const inputTemperature = 10;
const title = "FEB 2 - 11 2023";

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
    component.title = title;
    component.temperature = inputTemperature;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title if time period is received', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.info').textContent).toEqual(title);
  });

  it('should render temperature if its unit if received', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.temp-container').textContent).toEqual(`${inputTemperature}°C`);
  });

});
