import { Observable } from 'rxjs';

export abstract class AbstractWeatherProviderService {
  public abstract getWeather(): Observable<WeatherData[]>
  public abstract updateWeatherForecast(location: LocationData): void;
  public abstract getLoading(): Observable<boolean>;
}
