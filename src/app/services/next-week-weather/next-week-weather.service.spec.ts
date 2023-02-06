import { TestBed } from '@angular/core/testing';

import { NextWeekWeatherService } from './next-week-weather.service';

describe('NextWeekWeatherService', () => {
  let service: NextWeekWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NextWeekWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
