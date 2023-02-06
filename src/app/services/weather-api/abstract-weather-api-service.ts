import { LocationDataModel } from '../../components/location-picker/location-data.model';
import { Observable } from 'rxjs';
import { WeatherApiData } from './weather-api-response';

export abstract class AbstractWeatherApiService {

  // Todo: should not need a locationData parameter here
  public abstract getWeatherData(locationData: LocationDataModel): Observable<WeatherApiData | null>;

  public abstract updateWeatherData(locationData: LocationDataModel): Observable<WeatherApiData | null>;
}
