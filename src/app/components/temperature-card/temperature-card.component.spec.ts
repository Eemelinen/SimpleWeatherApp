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
    component.day = title;
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

});
