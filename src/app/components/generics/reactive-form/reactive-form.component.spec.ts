import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormComponent } from './reactive-form.component';
import { MockComponents } from 'ng-mocks';
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { ReactiveFormsModule } from '@angular/forms';

fdescribe('ReactiveFormComponent', () => {
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
    component.dropdownOptions = ['NL', 'BE'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have a form', () => {
    expect(component.form).toBeTruthy();
  });

  it('component should have a form with a dropdownValue control', () => {
    expect(component.form.get('dropdownValue')).toBeTruthy();
  });

  it('component should have a form with a textInputValue control', () => {
    expect(component.form.get('textInputValue')).toBeTruthy();
  });

  it('component should have a form with a dropdownValue control with first dropdownValue', () => {
    expect(component.form.get('dropdownValue')?.value).toEqual(component.dropdownOptions[0]);
  });

  it('template should render an input with value of empty string', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input').value).toEqual('');
  });

  it('component should have a form with a textInputValue control with empty value by default', () => {
    expect(component.form.get('textInputValue')?.value).toEqual('');
  });

  it('template should contain an image with class weather-icon', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('img.weather-icon')).toBeTruthy();
  });

});
