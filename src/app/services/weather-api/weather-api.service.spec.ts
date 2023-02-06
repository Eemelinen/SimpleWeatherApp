import { TestBed } from '@angular/core/testing';

import { WeatherApiService } from './weather-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('WeatherApiService', () => {
  let service: WeatherApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule ],
      providers: [
        {
          provide: MatSnackBar,
          useValue: {
            open: () => 'Snackbar opened'
          }
        },
      ]
    });
    service = TestBed.inject(WeatherApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
