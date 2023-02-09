type weather = {
  icon: string,
  code: number,
  description: string
}

type LocationData = {
  country: string,
  city: string
};

type SimpleFormOutput = {
  dropdownValue: string,
  textInputValue: string
};

type FullWeatherData = {
  datetime: string;
  temp: number;
  uv: number;
  wind_spd: number;
  weather: weather;
};

type WeatherCardData = {
  date: string,
  temperature: number,
};
