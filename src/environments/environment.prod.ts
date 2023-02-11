import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,
  weather_api_key: '',
  forecast_url_start: 'http://api.weatherbit.io/v2.0/forecast/daily',
  weather_icon_folder: 'assets/weather-icons/',
  extra_data_icon_folder: 'assets/extra-data-icons/'
};
