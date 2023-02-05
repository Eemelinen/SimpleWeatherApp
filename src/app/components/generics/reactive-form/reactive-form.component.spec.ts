import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormComponent } from './reactive-form.component';
import { MockComponents } from 'ng-mocks';
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ReactiveFormComponent', () => {
  let component: ReactiveFormComponent;
  let fixture: ComponentFixture<ReactiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        ReactiveFormComponent,
        MockComponents(
          CustomSelectComponent
        )
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have a form', () => {
    expect(component.form).toBeTruthy();
  });

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
