import { TestBed } from '@angular/core/testing';

import { MultiDayForecastService } from './multi-day-forecast.service';

describe('NextWeekService', () => {
  let service: MultiDayForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiDayForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
