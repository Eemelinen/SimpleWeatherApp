import { Observable } from 'rxjs';
import { AbstractWeatherApiService } from './weather-api/abstract-weather-api-service';

export abstract class AbstractWeatherWidgetService {
  constructor(protected apiService: AbstractWeatherApiService) {}
  public abstract get(): Observable<any>
}
