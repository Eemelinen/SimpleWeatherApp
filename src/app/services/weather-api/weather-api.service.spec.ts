import { TestBed } from '@angular/core/testing';

import { WeatherApiService } from './weather-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { mockWeatherApiResponse } from '../../../mocks/mock-weather-api-response';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { defaultWeatherData } from './default-weather-data';
import { WeatherApiResponse } from './weather-api-response';

fdescribe('WeatherApiService', () => {
  let service: WeatherApiService;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule ],
      providers: [
        {
          provide: MatSnackBar,
          useValue: matSnackBarSpy
        },
        {
          provide: HttpClient,
          useValue: httpClientSpy
        }
      ]
    });
    service = TestBed.inject(WeatherApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a default weather data if updateWeatherData has not been run', (done) => {
    service.getCurrentForecast().subscribe((res) => {
      expect(res).toEqual(defaultWeatherData);
      done();
    });
  });

  it('should call httpClient get method when updateWeatherData with correct url based on location parameters', () => {
    httpClientSpy.get.and.returnValue(of(mockWeatherApiResponse));

    service.updateWeatherData({city: 'London', country: 'UK'});
    expect(httpClientSpy.get).toHaveBeenCalledWith(
      'http://api.weatherbit.io/v2.0/forecast/daily?city=London,UK&key=891486a79eea4a11a30c4441468f08d9&days=10'
    );
  });

  it('calling getCurrentForecast after calling updateWeatherData should result in api response data being returned', (done) => {
    httpClientSpy.get.and.returnValue(of(mockWeatherApiResponse));
    spyOn(service, 'updateWeatherData').and.callThrough();

    service.updateWeatherData({city: mockWeatherApiResponse.city_name, country: mockWeatherApiResponse.country_code});
    service.getCurrentForecast().subscribe({
      error: () => done.fail('should not be called'),
      next: (res) => {
        expect(res.city_name).toEqual(mockWeatherApiResponse.city_name);
        expect(res.country_code).toEqual(mockWeatherApiResponse.country_code);
        expect(res.data).toEqual(mockWeatherApiResponse.data);
        done();
    }});
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('if api returns an error snackbar.open should be shown and getCurrentForecast should return defaultWeatherData', () => {
    const error = new HttpErrorResponse({status: 404, statusText: 'Not Found'});
    httpClientSpy.get.and.returnValue(throwError(() => error));
    service.updateWeatherData({city: mockWeatherApiResponse.city_name, country: mockWeatherApiResponse.country_code});

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(matSnackBarSpy.open).toHaveBeenCalledTimes(1);

    service.getCurrentForecast().subscribe((res) => {
      expect(res).toEqual({city_name: '', country_code: '', data: []});
    });
  });

  it('should return a default weather data if updateWeatherData params dont match response result', () => {
    httpClientSpy.get.and.returnValue(of(mockWeatherApiResponse));
    spyOn(service, 'updateWeatherData').and.callThrough();

    service.updateWeatherData({city: "London", country: "UK"});
    service.getCurrentForecast().subscribe((res) => {
      expectEmptyWeatherData(res);
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should return empty weather data if either of the location params are empty. HttpClient should be called in this case', () => {
    httpClientSpy.get.and.returnValue(of(mockWeatherApiResponse));
    spyOn(service, 'updateWeatherData').and.callThrough();

    service.updateWeatherData({city: "", country: ""});
    service.getCurrentForecast().subscribe({
      error: () => fail('should not be called'),
      next: (res) => {
        expectEmptyWeatherData(res);
      }});
    expect(httpClientSpy.get).toHaveBeenCalledTimes(0);
  });
});

function expectEmptyWeatherData(res: WeatherApiResponse) {
  expect(res.city_name).toEqual('');
  expect(res.country_code).toEqual('');
  expect(res.data).toEqual([]);
}
