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

type ApiWeatherData = {
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

type ExtraData = {
  title: string,
  imgUrl: string,
  value: string
}

type OneDayForecast = {
  city_name: string;
  temperature: number;
  weatherDescription: string;
  weatherIcon: string;
  rh : number;
  wind_spd : number;
  uv : number;
}

type WeekdayWeather = {
  dayOfWeek: string,
  weatherImg: string,
  weatherDescription: string,
  temperature: number,
}

type MultiDayWeatherForecast = {
  dateRange: string;
  forecasts: WeekdayWeather[]
}

type MultiDayComponentData = {
  dateRange: string;
  forecasts: WeekdayWeather[];
  averages: ExtraData[],
  graphData: number[];
}

type OneDayForecastComponentData = {
  city_name: string;
  temperature: number;
  weatherDescription: string;
  weatherIconUrl: string;
  extraData: ExtraData[]
}

