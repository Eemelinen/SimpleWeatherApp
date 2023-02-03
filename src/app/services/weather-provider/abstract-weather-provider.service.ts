import { Observable } from 'rxjs';

export abstract class AbstractWeatherProviderService {
  public abstract getWeather(country: string, city: string): Observable<WeatherData[]>
  public abstract fetchWeatherForecast(country: string, city: string): Observable<WeatherData[]>
}
