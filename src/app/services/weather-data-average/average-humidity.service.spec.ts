import { TestBed } from '@angular/core/testing';

import { AverageHumidityService } from './average-humidity.service';

describe('WeatherDataAverageService', () => {
  let service: AverageHumidityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AverageHumidityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
