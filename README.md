# Weather App with Angular 15
This simple weather app was built using Angular and the WeatherBit API. The app is responsive and works on both mobile and desktop.

![desktop](https://user-images.githubusercontent.com/37372229/220947849-18d87671-f98f-45ff-a270-77c3a7f95a45.png)
![mobile](https://user-images.githubusercontent.com/37372229/220947893-e099ade0-41bd-4f95-a4d9-6d4dd156bfd7.png)

## Features
* The app displays the current weather conditions for the location selected by the user
* To change the location, user can select a country from a dropdown and then type a name of the city.
* In  current implementation the app will display forecast for current day and next 7 days
* The background of the app features an animated gradient that is tied to the average temperature of the selected location. The gradient displays warm colors for warm weather and cooler colors for cold weather. In this way, the gradient provides a visual representation of the temperature, allowing users to easily understand the current weather conditions at a glance.
* The app will show a snackbar in case of typo in city name or if the city is not found in the selected country.
* The app will show a snackbar in case of any error from the API.

## Installation
* The app was built using Angular 15.1.0. To run the app you will need to install the Angular CLI. You can do so by running `npm install -g @angular/cli`. Refer to Angular documentation for more information. https://angular.io/guide/setup-local
* To run the app you will need to install the dependencies using `npm install` and then run `ng serve` to start the development server. Navigate to `http://localhost:4200/` to view the app.
* I have included weatherbit apikey (even though it's a bad practice) in the code for ease of testing purposes. If you want to use your own apikey, you can do so by replacing the apikey in the `src/app/environments/environment.ts` file. To get the key register at https://www.weatherbit.io

## Mock mode
* run application without api key in mock mode with command ng s -c mock

## Code
* I have used the snackbar from Angular Material library
* I have used the weatherbit API to fetch the weather data. I have used the free version of the API which allows 1500 calls per day. The API is free for personal use and does not require any registration.
* WeatherApiService handles the API calls and stores the latest fetched data to BehaviorSubject. This way, the data is available to all components that need it.
* From WeatherApiService the data is passed down to the components trough piping services, such as OneDayForecast and MultiDayForecast services. These do some general data manipulation that would otherwise have to be done in the components.

## Testing
* Application contains a robust set of unit tests
* To run the unit tests, run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
