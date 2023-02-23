import { Injectable } from '@angular/core';
import { AbstractWeatherApiService } from './abstract-weather-api-service';
import { LocationDataModel } from '../../components/location-picker/location-data.model';
import { Observable, of } from 'rxjs';
import { StoredWeatherData } from './weather-data.model';
import { mockStoredWeatherData } from '../../../assets/mocks/mock-weather-data';

@Injectable({
  providedIn: 'root'
})
export class MockWeatherApiService extends AbstractWeatherApiService {

  constructor() {
    super();
  }

  getCurrentForecast(): Observable<StoredWeatherData> {
    return of(mockStoredWeatherData);
  }

  updateWeatherData(location: LocationDataModel, days = 10): void {
    console.log('MockWeatherApiService.updateWeatherData()');
  }
}
