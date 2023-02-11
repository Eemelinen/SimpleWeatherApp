import { WeatherApiData } from '../../app/services/weather-api/weather-data.model';
import { mockWeatherApiResponse } from './mock-weather-api-response';

export const mockStoredWeatherData: WeatherApiData = new WeatherApiData(
  mockWeatherApiResponse.city_name,
  mockWeatherApiResponse.country_code,
  [
    {
      datetime: mockWeatherApiResponse['data'][0]['datetime'],
      temp: mockWeatherApiResponse['data'][0]['temp'],
      uv: mockWeatherApiResponse['data'][0]['uv'],
      rh: mockWeatherApiResponse['data'][0]['rh'],
      wind_spd: mockWeatherApiResponse['data'][0]['wind_spd'],
      weather: {
        icon: mockWeatherApiResponse['data'][0]['weather']['icon'],
        code: mockWeatherApiResponse['data'][0]['weather']['code'],
        description: mockWeatherApiResponse['data'][0]['weather']['description']
      }
    },
    {
      datetime: mockWeatherApiResponse['data'][1]['datetime'],
      temp: mockWeatherApiResponse['data'][1]['temp'],
      uv: mockWeatherApiResponse['data'][1]['uv'],
      rh: mockWeatherApiResponse['data'][1]['rh'],
      wind_spd: mockWeatherApiResponse['data'][1]['wind_spd'],
      weather: {
        icon: mockWeatherApiResponse['data'][1]['weather']['icon'],
        code: mockWeatherApiResponse['data'][1]['weather']['code'],
        description: mockWeatherApiResponse['data'][1]['weather']['description']
      }
    }
  ]
);
