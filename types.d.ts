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
  rh: number;
  weather: weather;
};

type WeatherCardData = {
  date: string,
  temperature: number,
};

type extraData = {
  title: string,
  imgUrl: string,
  value: string
}

type WeatherTodayData = {
  city_name: string;
  temperature: number;
  weatherDescription: string;
  weatherIcon: string;
  extraData: extraData[]

}
