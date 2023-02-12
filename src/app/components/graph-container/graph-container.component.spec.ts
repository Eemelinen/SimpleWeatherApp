import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraphContainerComponent } from './graph-container.component';

describe('GraphContainerComponent', () => {
  let component: GraphContainerComponent;
  let fixture: ComponentFixture<GraphContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphContainerComponent);
    component = fixture.componentInstance;
    component.values = [1, 2, 3, 4, 5, 6, 7];
    component.label = 'temperature';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a chart', () => {
    expect(component.chart).toBeTruthy();
  });

  it('should have the correct number of labels', () => {
    expect(component.chart.data.labels!.length).toEqual(component.values.length);
  });

  it('should have the correct number of data points', () => {
    expect(component.chart.data.datasets![0].data!.length).toEqual(component.values.length);
  });

  it('should have the correct label', () => {
    expect(component.chart.data.datasets![0].label).toEqual(component.label);
  });

  it('should have the correct data', () => {
    expect(component.chart.data.datasets![0].data).toEqual(component.values);
  });

});
