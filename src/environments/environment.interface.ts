export interface IEnvironment {
  production: boolean;
  weather_api_key: string;
  forecast_url_start: string;
  weather_icon_folder: string;
  extra_data_icon_folder: string;
  providers: any[];
}
