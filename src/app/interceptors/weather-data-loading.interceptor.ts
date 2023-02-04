import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {WeatherProviderService} from '../services/weather-provider/weather-provider.service';

@Injectable()
export class WeatherDataLoadingInterceptor implements HttpInterceptor {

  // Todo: could use interface and dependency injection here to change the data service
  constructor(private weatherProviderService: WeatherProviderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.weatherProviderService.startLoading();
    return next.handle(req).pipe(
      finalize(() => this.weatherProviderService.stopLoading())
    );
  }
}
