import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';

export abstract class AbstractWeatherProviderService {

  constructor(protected http: HttpClient, protected apiService: AbstractWeatherApiService) {}
  public abstract getNextSevenDaysTemperature(): Observable<WeatherCardData[]>;
  public abstract getAverageTemperature(): Observable<WeatherCardData>;
  public abstract getWeather(location: LocationData): Observable<WeatherData[]>
}
