import { TestBed } from '@angular/core/testing';

import { WeatherProviderService } from './weather-provider.service';
import {HttpClient} from '@angular/common/http';

describe('WeatherProviderService', () => {
  let service: WeatherProviderService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy
        }
      ],
    });
    service = TestBed.inject(WeatherProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
