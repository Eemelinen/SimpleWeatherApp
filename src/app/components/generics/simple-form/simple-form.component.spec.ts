import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleFormComponent } from './simple-form.component';

fdescribe('SimpleFormComponent', () => {
  let component: SimpleFormComponent;
  let fixture: ComponentFixture<SimpleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have a form', () => {
    expect(component.simpleForm).toBeTruthy();
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
