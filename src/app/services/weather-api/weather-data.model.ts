import { WeatherApiResponse } from './weather-api-response';

export class WeatherApiData implements WeatherApiResponse {
  constructor(public city_name: string,
              public country_code: string,
              public data: FullWeatherData[]) {
  }

  public static parseData(data: FullWeatherData[]): FullWeatherData[] {
    return data.map((data) => {
      return {
        datetime: data.datetime,
        temp: data.temp,
        uv: data.uv,
        wind_spd: data.wind_spd,
        rh: data.rh,
        weather: {
          icon: data.weather.icon,
          code: data.weather.code,
          description: data.weather.description
        }
      };
    });
  }

  public static isValid(data: WeatherApiData): boolean {
    return !(!data.city_name || !data.country_code || !data.data.length);

  }
}
