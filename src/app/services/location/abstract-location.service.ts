import { Observable } from 'rxjs';

export abstract class AbstractLocationService {
  abstract getCurrentLocation(): Observable<LocationData>;
  abstract getAvailableCountries(): string[];
}
