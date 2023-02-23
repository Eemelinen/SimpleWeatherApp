import { IEnvironment } from './environment.interface';
import { apiKey } from './api-key';

export const environment: IEnvironment = {
  production: false,
  weather_icon_folder: 'assets/images/weather-icons/',
  extra_data_icon_folder: 'assets/images/extra-data-icons/',
  weather_api_key: apiKey,
  forecast_url_start: 'http://api.weatherbit.io/v2.0/forecast/daily',
  providers: []
};
