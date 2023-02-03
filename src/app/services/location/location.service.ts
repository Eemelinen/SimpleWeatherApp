import { Injectable } from '@angular/core';
import { AbstractLocationService } from './abstract-location.service';
import { availableCountries } from './countries';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends AbstractLocationService  {
  private currentLocation: LocationData = { country: '', city: '' };

  constructor() {
    super();
  }

  getCurrentLocation(): LocationData {
    return this.currentLocation;
  }

  setCurrentLocation(location: LocationData) {
    this.currentLocation = location;
  }

  getAvailableCountries(): string[] {
    return availableCountries;
  }

}
