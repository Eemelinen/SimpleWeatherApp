import { AbstractWeatherWidgetService } from '../abstract-weather-widget.service';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { Observable } from 'rxjs';

export abstract class AbstractWeatherTodayService extends AbstractWeatherWidgetService {
  constructor(protected override apiService: AbstractWeatherApiService) {
    super(apiService);
  }

  abstract get(): Observable<oneDayWeather>;
}
