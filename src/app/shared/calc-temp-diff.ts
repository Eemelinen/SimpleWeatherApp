import { HasTemperature } from './has-tempeture.interface';

export const calcTemperatureDiff = (data: HasTemperature[]): number => {
  let temperatures = data.map((data) => data.temperature)
  let minTemperature = Math.min(...temperatures);
  let maxTemperature = Math.max(...temperatures);
  let temperatureDifference = maxTemperature - minTemperature;

  return Math.round(temperatureDifference);
}
