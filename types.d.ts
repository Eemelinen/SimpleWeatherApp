type weather = {
  icon: string,
  code: number,
  description: string
}

type WeatherData = {
  datetime: string;
  temp: number;
  uv: number;
  wind_spd: number;
  weather: weather;
};

type LocationData = {
  country: string,
  city: string
};

type SimpleFormOutput = {
  dropdownValue: string,
  textInputValue: string
};

type WeatherCardData = {
  title: string,
  temperatureValue: number,
};
