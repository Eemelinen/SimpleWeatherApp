export interface WeatherApiResponse {
  "city_name": string,
  "country_code": string,
  "data": [
    temp: number,
    datetime: string
  ]
}

export interface WeatherApiData {
  "city_name": string,
  "country_code": string,
  "data": [
    temp: number,
    datetime: string
  ]
}

export class WeatherApiDataModel implements WeatherApiData {
  city_name: string;
  country_code: string;
  data: [temp: number, datetime: string];

  constructor(city_name: string, country_code: string, data: [temp: number, datetime: string]) {
    this.city_name = city_name;
    this.country_code = country_code;
    this.data = data;
  }
}
