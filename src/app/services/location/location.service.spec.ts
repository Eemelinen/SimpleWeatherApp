import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import { availableCountries } from './countries';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return countries', function () {
    const countries = service.getAvailableCountries();
    expect(countries.length).toBeGreaterThan(0);
    expect(countries[0]).toBe(availableCountries[0]);
  });
});
