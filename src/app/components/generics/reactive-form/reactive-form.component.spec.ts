import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormComponent } from './reactive-form.component';
import { MockComponents } from 'ng-mocks';
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { ReactiveFormsModule } from '@angular/forms';

const testPlaceholder = 'test placeholder';

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
    component.loading = false;
    component.placeholder = testPlaceholder;
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

  it('template should contain an input with placeholder received from inputs', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input').placeholder).toEqual(testPlaceholder);
  });

  it('template input should contain a search.svg img as a source if loading is false' , () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.input-container img').src).toContain('search.svg');
    expect(compiled.querySelector('.input-container img')).not.toContain('loading.svg');
  });

  it('template input should contain a loading.svg img as a source if loading is true' , () => {
    component.loading = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.input-container img').src).toContain('loading.svg');
    expect(compiled.querySelector('.input-container img')).not.toContain('search.svg');
  });

  it('template should contain a custom-select component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-custom-select')).toBeTruthy();
  });
});
