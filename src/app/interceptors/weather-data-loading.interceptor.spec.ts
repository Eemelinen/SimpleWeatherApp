import { TestBed } from '@angular/core/testing';

import { WeatherDataLoadingInterceptor } from './weather-data-loading.interceptor';

describe('WeatherDataLoadingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      WeatherDataLoadingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: WeatherDataLoadingInterceptor = TestBed.inject(WeatherDataLoadingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
