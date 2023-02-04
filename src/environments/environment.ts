import { apiKey } from './api-key';

export const environment = {
  production: false,
  WEATHER_API_KEY: apiKey,
  FORECAST_URL_START: 'http://api.weatherbit.io/v2.0/forecast/daily',
};
