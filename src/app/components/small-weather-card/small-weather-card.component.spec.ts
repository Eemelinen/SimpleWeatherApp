import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmallWeatherCardComponent } from './small-weather-card.component';

const title = 'Monday';
const temp = 12;

describe('WeekdayWeatherComponent', () => {
  let component: SmallWeatherCardComponent;
  let fixture: ComponentFixture<SmallWeatherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallWeatherCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallWeatherCardComponent);
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

});
