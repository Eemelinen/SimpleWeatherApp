import { IEnvironment } from './environment.interface';
import { AbstractWeatherApiService } from '../app/services/weather-api/abstract-weather-api-service';
import { AbstractOneDayForecastService } from '../app/services/one-day-forecast/abtract-forecast-today.service';
import { AbstractMultiDayForecastService } from '../app/services/multi-day-forecast/abstract-multi-day-forecast.service';
import { MockWeatherApiService } from '../app/services/weather-api/mock-weather-api.service';
import { MockOneDayForecastService } from '../app/services/one-day-forecast/mock-one-day-forecast.service';
import { MockMultiDayForecastService } from '../app/services/multi-day-forecast/mock-multi-day-forecast.service';

const providers = [
  { provide: AbstractWeatherApiService, useClass: MockWeatherApiService },
  { provide: AbstractOneDayForecastService, useClass: MockOneDayForecastService },
  { provide: AbstractMultiDayForecastService, useClass: MockMultiDayForecastService },
];

export const environment: IEnvironment = {
  production: false,
  weather_icon_folder: 'assets/images/weather-icons/',
  extra_data_icon_folder: 'assets/images/extra-data-icons/',
  weather_api_key: '',
  forecast_url_start: 'http://api.weatherbit.io/v2.0/forecast/daily',
  providers
};
