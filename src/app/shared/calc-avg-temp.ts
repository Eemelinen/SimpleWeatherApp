import { HasTemperature } from './has-tempeture.interface';

export const calcAvgTemperature = (data: HasTemperature[]): number => {
  const avgTemperature = data.reduce(
    (sum, data) => sum + data.temperature, 0) / data.length;
  return +avgTemperature.toFixed(1);
}
