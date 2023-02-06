import { TestBed } from '@angular/core/testing';

import { WeatherApiService } from './weather-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('WeatherApiService', () => {
  let service: WeatherApiService;
  let httpTestingCotroller: HttpTestingController;

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
    httpTestingCotroller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a default weather data', (done) => {
    service.getCurrentForecast().subscribe((res) => {
      expect(res).toEqual({city_name: '', country_code: '', data: []});
      done();
    });
  });

  it('updateWeatherData should trigger a http call', (done) => {
    const spy = spyOn(service, 'updateWeatherData').and.callThrough();
    service.updateWeatherData({city: 'New York', country: 'US'});
    expect(spy).toHaveBeenCalledTimes(1);
    done();
  });

});
