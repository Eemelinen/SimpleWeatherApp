import { Component, Input } from '@angular/core';

type DateObject = { year: string; month: string; day: string };

@Component({
  selector: 'app-average-temperature-card',
  templateUrl: './average-temperature-card.component.html',
  styleUrls: ['./average-temperature-card.component.scss']
})
export class AverageTemperatureCardComponent {
  @Input() forecasts: WeatherData[] = [];

  getDates(): string {
    const dateRange = this.getDateRange(this.forecasts);
    return this.formatDateRange(dateRange.firstDateObj, dateRange.lastDateObj);
  }


  calculateAverageTemperature(data: WeatherData[]) {
    const total = data.reduce((acc, day: WeatherData) => acc + day.temp, 0);
    return Math.round((total / data.length));
  }

  private formatDateRange(firstDate: DateObject, lastDate: DateObject): string {
    const firstMonth = this.getMonthName(Number(firstDate.month) - 1);
    const lastMonth = this.getMonthName(Number(lastDate.month) - 1);

    if (firstDate.year !== lastDate.year) {
      return `${firstMonth} ${firstDate.day}, ${firstDate.year} - ${lastMonth} ${lastDate.day} ${lastDate.year}`;
    }

    if (firstDate.month !== lastDate.month) {
      return `${firstMonth} ${firstDate.day} - ${lastMonth} ${lastDate.day} ${lastDate.year}`;
    }

    return `${firstMonth} ${firstDate.day} - ${lastDate.day} ${lastDate.year}`;
  }

  private getDateRange(data: WeatherData[]): { firstDateObj: DateObject; lastDateObj: DateObject } {
    const firstDate = data[0].date;
    const lastDate = data[data.length - 1].date;

    const [fYear, fMonth, fDay] = firstDate.split("-");
    const [eYear, eMonth, eDay] = lastDate.split("-");

    const firstDateObj = {year: fYear, month: fMonth, day: this.removeFirstCharIfZero(fDay)};
    const lastDateObj = {year:eYear, month: eMonth, day: this.removeFirstCharIfZero(eDay)};

    return { firstDateObj, lastDateObj }
  }

  private getMonthName(month: number): string {
    const months = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];
    return months[month];
  }

  private removeFirstCharIfZero(str: string) {
    if (str[0] === '0') {
      return str.slice(1);
    }
    return str;
  }

}
