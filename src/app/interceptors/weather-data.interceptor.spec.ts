import { TestBed } from '@angular/core/testing';

import { WeatherDataInterceptor } from './weather-data.interceptor';

describe('WeatherDataInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      WeatherDataInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: WeatherDataInterceptor = TestBed.inject(WeatherDataInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
