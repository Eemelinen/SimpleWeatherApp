/// <reference path="../../../../types.d.ts" />

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPickerComponent } from './location-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import {mockAvailableCountries} from '../../../assets/mocks/mock-available-countries';
import {MockComponents} from 'ng-mocks';
import {CustomSelectComponent} from '../generics/custom-select/custom-select.component';
import {ReactiveFormComponent} from '../generics/reactive-form/reactive-form.component';
import {LocationDataModel} from './location-data.model';

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

  it('template should have an image with class weather-icon and alt cloudy', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('img.weather-icon').alt).toEqual('cloudy');
  });

  it('should have app-reactive-form inside div with form-container class', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.form-container app-reactive-form')).toBeTruthy();
  });

  it('emitLocationData should emit locationChanged event with LocationDataModel values', () => {
    const emitSpy = spyOn(component.locationChanged, 'emit');
    component.emitLocationData({dropdownValue: 'Poland', textInputValue: 'Warsaw'});
    expect(emitSpy).toHaveBeenCalledWith({country: 'Poland', city: 'Warsaw'});
  });
});
