import { Observable } from 'rxjs';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';

export abstract class AbstractWeatherProviderService {

  constructor(protected apiService: AbstractWeatherApiService) {}
  public abstract getNextSevenDaysTemperature(): Observable<WeatherCardData[]>;
  public abstract getAverageTemperature(): Observable<WeatherCardData>;
  public abstract getWeather(location: LocationData): Observable<WeatherData[]>
}
