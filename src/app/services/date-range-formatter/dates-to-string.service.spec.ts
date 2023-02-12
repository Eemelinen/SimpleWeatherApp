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

  it('should format correctly when no month changes', () => {
    const result = service.format([
      { datetime: '2023-02-02' },
      { datetime: '2023-02-03' },
      { datetime: '2023-02-04' },
      { datetime: '2023-02-05' }
    ]);
    expect(result).toEqual('FEB 2 - 5 2023');
  });

  it('should format correctly when month changes', () => {
    const result = service.format([
      { datetime: '2023-02-30' },
      { datetime: '2023-02-31' },
      { datetime: '2023-03-01' },
      { datetime: '2023-03-02' },
      { datetime: '2023-03-03' },
      { datetime: '2023-03-04' },
      { datetime: '2023-03-05' }
    ]);
    expect(result).toEqual('FEB 30 - MAR 5 2023');
  });

  it('should format correctly when year changes', () => {
    const result = service.format([
      { datetime: '2022-12-30' },
      { datetime: '2022-12-31' },
      { datetime: '2023-01-01' },
      { datetime: '2023-01-02' },
      { datetime: '2023-01-03' }
    ]);
    expect(result).toEqual('DEC 30 2022 - JAN 3 2023');
  });
});
