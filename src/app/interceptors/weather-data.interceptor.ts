import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { AbstractLoadingService } from '../services/loading/abstract-loading-service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

/**
 * Intercepts all HTTP requests and sets the loading state to true
 * When the request completes, sets the loading state to false
 * In case of more than one request, the loading state will only be set to false when all requests have completed
 * AS application grows more interceptors could be added to handle other loading states
 */
@Injectable()
export class WeatherDataInterceptor implements HttpInterceptor {

  constructor(
    private loadingService: AbstractLoadingService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.setLoading(true, request.url);
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.loadingService.setLoading(false, request.url);
          return throwError(() => error);
        }),
        map((event: HttpEvent<unknown>) => {
          if (event instanceof HttpResponse) {
            this.loadingService.setLoading(false, request.url);
          }
          return event;
        })
      );
  }
}
