import { Injectable } from '@angular/core';
import { AbstractLocationService } from './abstract-location.service';
import { mockAvailableCountries } from '../../../mocks/mock-available-countries';

@Injectable({
  providedIn: 'root'
})
export class MockLocationService extends AbstractLocationService {
  constructor() {
    super();
  }

  getAvailableCountries(): string[] {
    return mockAvailableCountries;
  }
}
