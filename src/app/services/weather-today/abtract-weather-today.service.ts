import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { Observable } from 'rxjs';

export abstract class AbstractOneDayWeatherService {
  constructor(protected apiService: AbstractWeatherApiService) {}

  abstract get(daysFromNow?: number): Observable<OneDayWeather>;
}
