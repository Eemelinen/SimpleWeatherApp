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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
