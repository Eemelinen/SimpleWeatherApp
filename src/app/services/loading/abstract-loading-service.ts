import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractLoadingService {
  abstract getLoading(): Observable<boolean>;
  abstract setLoading(loading: boolean, url: string): void;
}
