import { HasTemperature } from '../interfaces/has-tempeture.interface';

export const formatGraphData = (dailyData: HasTemperature[]): number[] => {
  return dailyData.map((data) => data.temperature);
}
