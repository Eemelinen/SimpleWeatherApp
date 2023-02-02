import {concatMap, delay, from, Observable, of} from 'rxjs';
import { mockWeatherData } from './mock-weather-data';

export const mockWeatherObservable = of(mockWeatherData).pipe(delay(1000));
