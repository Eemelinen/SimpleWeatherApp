import { WeatherApiResponse } from './weather-api-response';

export class WeatherApiData implements WeatherApiResponse {
  constructor(public city_name: string,
              public country_code: string,
              public data: WeatherData[]) {
  }

  public static parseData(data: WeatherData[]): WeatherData[] {
    return data.map((data) => {
      return {
        datetime: data.datetime,
        temp: data.temp,
        uv: data.uv,
        wind_spd: data.wind_spd,
        weather: {
          icon: data.weather.icon,
          code: data.weather.code,
          description: data.weather.description
        }
      };
    });
  }
}
