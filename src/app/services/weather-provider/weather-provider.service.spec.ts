import { TestBed } from '@angular/core/testing';
import { WeatherProviderService } from './weather-provider.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AbstractLocationService } from '../location/abstract-location.service';
import { MockLocationService } from '../location/mock-location.service';

describe('WeatherProviderService', () => {
  let service: WeatherProviderService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: AbstractLocationService,
          useClass: MockLocationService
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
    service.getWeather().subscribe(
      weather => expect(weather).toContain(expectedWeather, 'expected weather'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

});
