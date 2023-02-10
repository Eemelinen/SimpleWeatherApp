import { TestBed } from '@angular/core/testing';

import { NextWeekService } from './next-week.service';

describe('NextWeekService', () => {
  let service: NextWeekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NextWeekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
