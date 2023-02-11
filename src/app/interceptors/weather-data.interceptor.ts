import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { AbstractLoadingService } from '../services/loading/abstract-loading-service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';

/**
 * This class is for intercepting http requests. When a request starts, we set the loadingSub property
 * in the LoadingService to true. Once the request completes and we have a response, set the loadingSub
 * property to false. If an error occurs while servicing the request, set the loadingSub property to false.
 */
@Injectable()
export class WeatherDataInterceptor implements HttpInterceptor {

  constructor(
    private loadingService: AbstractLoadingService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.setLoading(true, request.url);
    return next.handle(request)
      .pipe(catchError((err) => {
        this.loadingService.setLoading(false, request.url);
        return err;
      }))
      .pipe(
        // @ts-ignore
        map<HttpEvent<any>, any>((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.loadingService.setLoading(false, request.url);
        }
        return event;
      }));
  }
}
