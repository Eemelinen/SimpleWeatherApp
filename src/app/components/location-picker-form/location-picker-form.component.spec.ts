import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPickerFormComponent } from './location-picker-form.component';

describe('LocationPickerFormComponent', () => {
  let component: LocationPickerFormComponent;
  let fixture: ComponentFixture<LocationPickerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationPickerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationPickerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
