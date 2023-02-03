import { delay, of } from 'rxjs';
import { mockWeatherApiResponse } from './mock-weather-api-response';

export const mockWeatherForecast = of(mockWeatherApiResponse).pipe(delay(1000));
