import { TestBed } from '@angular/core/testing';
import { WeatherProviderService } from './weather-provider.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AbstractLocationService } from '../location/abstract-location.service';
import { MockLocationService } from '../location/mock-location.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractWeatherApiService } from '../weather-api/abstract-weather-api-service';
import { mockWeatherApiResponse } from '../../../mocks/mock-weather-api-response';
import { of } from 'rxjs';

describe('WeatherProviderService', () => {
  let service: WeatherProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: AbstractWeatherApiService,
          useValue: {
            getWeatherData: () => of(mockWeatherApiResponse)
          }
        },
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

});
