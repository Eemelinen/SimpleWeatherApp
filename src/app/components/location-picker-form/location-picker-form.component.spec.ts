/// <reference path="../../../../types.d.ts" />

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPickerFormComponent } from './location-picker-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('LocationPickerFormComponent', () => {
  let component: LocationPickerFormComponent;
  let fixture: ComponentFixture<LocationPickerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationPickerFormComponent ],
      imports: [
        ReactiveFormsModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationPickerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    expect(component.locationForm).toBeTruthy();
  });

  it('should have a form with a country control', () => {
    expect(component.locationForm.get('country')).toBeTruthy();
  });

  it('should have a form with a city control', () => {
    expect(component.locationForm.get('city')).toBeTruthy();
  });

  it('should have a form with a country control with first country in countries as default value', () => {
    expect(component.locationForm.get('country')?.value).toEqual(component.countries[0].code);
  });

  it('should render an input with value of empty string', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input').value).toEqual('');
  });

  it('should render a select with value of NL', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input').value).toEqual('');
  });

  it('should have a form with a city control with value NL', () => {
    expect(component.locationForm.get('city')?.value).toEqual('');
  });

  it('should contain an image with class weather-icon', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('img.location__weather-icon')).toBeTruthy();
  });

});
