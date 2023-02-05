import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';

export abstract class AbstractWeatherProviderService {

  constructor(protected http: HttpClient, protected weatherData: AbstractWeatherApiService) {}

  public abstract getWeather(): Observable<WeatherData[]>
  public abstract updateWeatherForecast(location: LocationData): void;
  public abstract getLoading(): Observable<boolean>;
}
