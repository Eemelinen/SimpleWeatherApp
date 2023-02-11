import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractLoadingService } from './abstract-loading-service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService implements AbstractLoadingService {
  private loadingWeatherData$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loadingWeatherData$ = this.loadingWeatherData$$.asObservable();

  /**
   * Contains in-progress loading requests
   * as app grows could use loading map to handle multiple loading states based on url etc
   */
  loadingMap: Map<string, boolean> = new Map<string, boolean>();

  getLoading(): Observable<boolean> {
    return this.loadingWeatherData$;
  }

  setLoading(loading: boolean, url: string): void {
    if (loading) {
      this.loadingMap.set(url, loading);
      this.loadingWeatherData$$.next(true);
    } else if (!loading && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }

    if (!this.loadingMap.size) {
      this.loadingWeatherData$$.next(false);
    }
  }
}
