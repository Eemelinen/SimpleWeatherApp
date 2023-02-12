import { TestBed } from '@angular/core/testing';

import { DatesToStringService } from './dates-to-string.service';

describe('DatesToStringService', () => {
  let service: DatesToStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatesToStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
