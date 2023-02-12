import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading-service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set loading to true', () => {
    service.setLoading(true, 'test');
    service.getLoading().subscribe((loading) => {
      expect(loading).toBeTruthy();
    })
  });

  it('should set loading to false when loadingMap is empty', () => {
    service.setLoading(true, 'test');
    service.setLoading(false, 'test');

    service.getLoading().subscribe((loading) => {
      expect(loading).toBeFalsy();
    });
  });
});
