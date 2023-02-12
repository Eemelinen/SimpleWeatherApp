import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExtraDataContainerComponent } from './extra-data-container.component';

describe('ExtraDataContainerComponent', () => {
  let component: ExtraDataContainerComponent;
  let fixture: ComponentFixture<ExtraDataContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraDataContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtraDataContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have element with class extra-data-container', () => {
    const element = fixture.nativeElement;
    expect(element.querySelector('.extra-data-container')).toBeTruthy();
  });
});
