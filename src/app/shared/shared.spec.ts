import { calcTempAvg } from './calc-temp-avg';
import { calcTempDiff } from './calc-temp-diff';
import { extraDataUV } from './extra-data-uv';
import { extraDataWindSpeed } from './extra-data-wind-speed';
import { formatGraphData } from './format-graph-data';

describe('Shared function', () => {
  it('calcAvgTemp should return average temperature', () => {
    expect(calcTempAvg([
      { temperature: 11 },
      { temperature: 9 },
      { temperature: 31 },
    ])).toEqual(17);
  });

  it('calcTempDiff should return difference between lowest and largest temperature', () => {
    expect(calcTempDiff([
      { temperature: 1 },
      { temperature: 2 },
      { temperature: 10 },
    ])).toEqual(9);
  });

  it('extraDataUv should return an object ready be used as input for extra data component', () => {
    expect(extraDataUV(2, 'assets/icons/')).toEqual({
      title: 'UV',
      imgUrl: 'assets/icons/uv.png',
      value: 'Low'
    });
  });

  it('extraDataWindSpeed should return an object ready be used as input for extra data component', () => {
    expect(extraDataWindSpeed(1, 'assets/icons/')).toEqual({
      title: 'WS',
      imgUrl: 'assets/icons/wind.png',
      value: '1 m/s'
    });
  });

  it('formatGraphData should return correct array of numbers ready to be used by the graph container component', () => {
    expect(formatGraphData([
      { temperature: 1 },
      { temperature: 2 },
      { temperature: 10 },
    ])).toEqual([1, 2, 10]);
  });
});
