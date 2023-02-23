import { Injectable } from '@angular/core';
import { IEnvironment } from '../../../environments/environment.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService implements IEnvironment {

  constructor() { }

  get production(): boolean {
    return environment.production;
  }

  get extra_data_icon_folder(): string {
    return environment.extra_data_icon_folder;
  }

  get forecast_url_start(): string {
    return environment.forecast_url_start;
  }

  get weather_api_key(): string {
    return environment.weather_api_key;
  }

  get weather_icon_folder(): string {
    return environment.weather_icon_folder;
  }

  get providers(): any[] {
    return environment.providers;
  }
}
