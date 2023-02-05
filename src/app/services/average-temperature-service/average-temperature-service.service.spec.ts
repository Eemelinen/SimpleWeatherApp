import { TestBed } from '@angular/core/testing';

import { AverageTemperatureServiceService } from './average-temperature-service.service';

describe('AverageTemperatureServiceService', () => {
  let service: AverageTemperatureServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AverageTemperatureServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
