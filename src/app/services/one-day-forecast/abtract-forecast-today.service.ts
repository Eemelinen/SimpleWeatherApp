import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { Observable } from 'rxjs';

export abstract class AbstractOneDayForecastService {
  constructor(protected apiService: AbstractWeatherApiService) {}

  abstract get(daysFromNow?: number): Observable<OneDayForecast>;
}
