import { TestBed } from '@angular/core/testing';

import { AverageTemperatureService } from './average-temperature.service';

describe('AverageTemperatureService', () => {
  let service: AverageTemperatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AverageTemperatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
