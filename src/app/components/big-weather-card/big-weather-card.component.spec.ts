import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BigWeatherCardComponent } from './big-weather-card.component';

describe('BigWeatherCardComponent', () => {
  let component: BigWeatherCardComponent;
  let fixture: ComponentFixture<BigWeatherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigWeatherCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigWeatherCardComponent);
    component = fixture.componentInstance;
    component.imgUrl = 'test-url';
    component.weatherDesc = 'Clear sky';
    component.temperature = 9;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have img element with imgUrl as src and weatherDesc as alt', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img.src).toContain(component.imgUrl);
    expect(img.alt).toContain(component.weatherDesc);
  });

  it('should have div with class "temperature" and textContent equal to temperature', () => {
    const div = fixture.nativeElement.querySelector('.temperature');
    expect(div.textContent).toContain(component.temperature);
  });
});
