import { Observable } from 'rxjs';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';

export abstract class AbstractNextWeekService {
  constructor(protected apiService: AbstractWeatherApiService) {
  }

  abstract get(): Observable<WeatherNextWeekData>;
}
