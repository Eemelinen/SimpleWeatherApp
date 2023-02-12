import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraDataCardComponent } from './extra-data-card.component';

describe('ExtraDataCardComponent', () => {
  let component: ExtraDataCardComponent;
  let fixture: ComponentFixture<ExtraDataCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraDataCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtraDataCardComponent);
    component = fixture.componentInstance;
    component.title = 'Test title';
    component.imgUrl = 'test-url';
    component.data = 'test-data';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a img element with imgUrl as src and title as alt', () => {
    const compiled = fixture.nativeElement;
    const img = compiled.querySelector('img');
    expect(img.src).toContain(component.imgUrl);
    expect(img.alt).toContain(component.title);
  });

  it('should render an element with class data-type and title as text content', () => {
    const compiled = fixture.nativeElement;
    const title = compiled.querySelector('.data-type');
    expect(title.textContent).toContain(component.title);
  });

  it('should render an element with class data with data as text content', () => {
    const compiled = fixture.nativeElement;
    const data = compiled.querySelector('.data');
    expect(data.textContent).toContain(component.data);
  });
});
