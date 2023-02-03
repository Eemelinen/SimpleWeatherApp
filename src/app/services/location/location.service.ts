import { Injectable } from '@angular/core';
import { AbstractLocationService } from './abstract-location.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { availableCountries } from './countries';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends AbstractLocationService  {
  private currentLocation$$ = new BehaviorSubject<LocationData>({country: '', city: ''})
  private currentLocation: Observable<LocationData> = this.currentLocation$$.asObservable();

  constructor(private http: HttpClient) {
    super();
  }

  getCurrentLocation(): Observable<LocationData> {
    return this.currentLocation;
  }

  getAvailableCountries(): string[] {
    return availableCountries;
  }

}
