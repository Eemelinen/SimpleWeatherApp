import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureCardComponent } from './temperature-card.component';

const title = 'Monday';
const temp = 12;

describe('TemperatureCardComponent', () => {
  let component: TemperatureCardComponent;
  let fixture: ComponentFixture<TemperatureCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperatureCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperatureCardComponent);
    component = fixture.componentInstance;
    component.title = title;
    component.temperature = temp;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title received as input', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain(title);
  });

  it('should render the temperature received as input', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.temperature').textContent).toContain(temp);
  });

  it('if input bigCard is true should add the class big-card', () => {
    const compiled = fixture.nativeElement;
    component.bigCard = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.card').classList).toContain('big-card');
  });

  it('if input bigCard is false should not add the class big-card', () => {
    const compiled = fixture.nativeElement;
    component.bigCard = false;
    fixture.detectChanges();
    expect(compiled.querySelector('.card').classList).not.toContain('big-card');
  });
});
