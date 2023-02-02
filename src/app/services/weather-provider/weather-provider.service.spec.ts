import { TestBed } from '@angular/core/testing';
import { WeatherProviderService } from './weather-provider.service';
import { HttpClient } from '@angular/common/http';

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

  xit('should return expected weather (HttpClient called once)', () => {
    const expectedWeather = {date: '2020-01-01', temp: 10};
    httpClientSpy.get.and.returnValue(expectedWeather);
    service.getWeather('NL', 'Amsterdam').subscribe(
      weather => expect(weather).toContain(expectedWeather, 'expected weather'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

});
