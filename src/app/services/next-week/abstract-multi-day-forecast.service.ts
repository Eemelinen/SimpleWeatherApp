import { Observable } from 'rxjs';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';

export abstract class AbstractMultiDayForecastService {
  constructor(protected apiService: AbstractWeatherApiService) {}

  abstract get(startDay?: number, endDay?: number): Observable<MultiDayWeatherForecast>;
}
