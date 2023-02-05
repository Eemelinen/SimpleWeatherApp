import { LocationDataModel } from '../../components/location-picker/location-data.model';
import { Observable } from 'rxjs';
import { WeatherApiData } from './weather-api-response';

export abstract class AbstractWeatherApiService {
  public abstract getWeatherData(locationData: LocationDataModel): Observable<WeatherApiData | []>;
}
