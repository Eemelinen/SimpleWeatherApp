export abstract class AbstractLocationService {
  abstract getCurrentLocation(): LocationData;
  abstract getAvailableCountries(): string[];
}
