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
  constructor(
    public city_name: string,
    public country_code: string,
    public data: [
      temp: number,
      datetime: string
    ]
  ) {}
}
