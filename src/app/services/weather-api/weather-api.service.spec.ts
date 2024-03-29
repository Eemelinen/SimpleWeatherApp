import { TestBed } from '@angular/core/testing';
import { WeatherApiService } from './weather-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { mockWeatherApiResponse } from '../../../assets/mocks/mock-weather-api-response';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { emptyWeatherData } from './empty-weather-data';
import { WeatherApiResponse } from './weather-api-response';
import { mockStoredWeatherData } from '../../../assets/mocks/mock-weather-data';
import { EnvironmentService } from '../environment/environment.service';

const mockApiKey = 'mockkey';

describe('WeatherApiService', () => {
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
        },
        {
          provide: EnvironmentService,
          useValue: {
            forecast_url_start: 'https://mockurl/',
            forecast_url_end: '/mockurl',
            weather_api_key: mockApiKey
          }
        }
      ]
    });
    service = TestBed.inject(WeatherApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a default weather data if updateWeatherData has not been run', () => {
    service.getCurrentForecast().subscribe((res) => {
      expect(res).toEqual(emptyWeatherData);
    });
  });

  it('should call httpClient get method when updateWeatherData with correct url based on location parameters', () => {
    httpClientSpy.get.and.returnValue(of(mockWeatherApiResponse));
    service.updateWeatherData({city: 'London', country: 'UK'});
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('getCurrentForecast after calling updateWeatherData should result in correctly filled data being returned', () => {
    httpClientSpy.get.and.returnValue(of(mockWeatherApiResponse));
    spyOn(service, 'updateWeatherData').and.callThrough();

    service.updateWeatherData({city: mockWeatherApiResponse.city_name, country: mockWeatherApiResponse.country_code});
    service.getCurrentForecast().subscribe({
      error: () => fail('should not be called'),
      next: (res) => {
        expect(res.city_name).toEqual(mockWeatherApiResponse.city_name);
        expect(res.country_code).toEqual(mockWeatherApiResponse.country_code);
        expect(res.data).toEqual(mockStoredWeatherData.data);
    }});
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(`https://mockurl/?city=${mockWeatherApiResponse.city_name},${mockWeatherApiResponse.country_code}&key=${mockApiKey}&days=10`);
  });

  it('if api returns an error snackbar open method should be called and getCurrentForecast should return defaultWeatherData', () => {
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
