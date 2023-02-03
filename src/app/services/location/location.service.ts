import { Injectable } from '@angular/core';
import { AbstractLocationService } from './abstract-location.service';
import { availableCountries } from './countries';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends AbstractLocationService  {

  constructor() {
    super();
  }

  getAvailableCountries(): string[] {
    return availableCountries;
  }

}
