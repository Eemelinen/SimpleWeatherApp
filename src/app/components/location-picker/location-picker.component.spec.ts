/// <reference path="../../../../types.d.ts" />

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPickerComponent } from './location-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import {mockAvailableCountries} from '../../../mocks/mock-available-countries';
import {MockComponents} from 'ng-mocks';
import {CustomSelectComponent} from '../generics/custom-select/custom-select.component';
import {ReactiveFormComponent} from '../generics/reactive-form/reactive-form.component';

describe('LocationPickerFormComponent', () => {
  let component: LocationPickerComponent;
  let fixture: ComponentFixture<LocationPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LocationPickerComponent,
        MockComponents(
          CustomSelectComponent,
          ReactiveFormComponent
        ),
      ],
      imports: [
        ReactiveFormsModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationPickerComponent);
    component = fixture.componentInstance;
    component.countries = mockAvailableCountries;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //
  // it('should have a form', () => {
  //   expect(component.locationForm).toBeTruthy();
  // });
  //
  // it('should have a form with a country control', () => {
  //   expect(component.locationForm.get('country')).toBeTruthy();
  // });
  //
  // it('should have a form with a city control', () => {
  //   expect(component.locationForm.get('city')).toBeTruthy();
  // });
  //
  // it('should have a form with a country control with first country', () => {
  //   expect(component.locationForm.get('country')?.value).toEqual(component.countries[0]);
  // });
  //
  // it('should render an input with value of empty string', () => {
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('input').value).toEqual('');
  // });
  //
  // it('should render a select with value of NL', () => {
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('input').value).toEqual('');
  // });
  //
  // it('should have a form with a city control with value NL', () => {
  //   expect(component.locationForm.get('city')?.value).toEqual('');
  // });
  //
  // it('should contain an image with class weather-icon', () => {
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('img.weather-icon')).toBeTruthy();
  // });

});
