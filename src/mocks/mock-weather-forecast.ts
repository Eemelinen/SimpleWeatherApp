import { delay, of } from 'rxjs';
import { mockWeatherData } from './mock-weather-data';

export const mockWeatherForecast = of(mockWeatherData).pipe(delay(1000));
