import { TestBed } from '@angular/core/testing';
import { WeatherProviderService } from './weather-provider.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AbstractLocationService } from '../location/abstract-location.service';
import { MockLocationService } from '../location/mock-location.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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
          provide: MatSnackBar,
          useValue: {
            open: () => 'Snackbar opened'
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

  it('should return expected weather (HttpClient called once)', () => {
    pending();
  });

});
