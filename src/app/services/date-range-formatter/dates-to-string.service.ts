import { Injectable } from '@angular/core';
import { AbstractDatesToStringService } from './abstract-dates-to-string.service';
import { HasDatetimeInterface } from '../../shared/has-datetime.interface';

type DateObject = { year: string; month: string; day: string };
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

@Injectable({
  providedIn: 'root'
})
export class DatesToStringService extends AbstractDatesToStringService {

  public format(nextWeekData: HasDatetimeInterface[]): string {
    const dateRange = this.getDateRange(nextWeekData);
    console.log(dateRange);
    return this.formatDateRange(dateRange.firstDateObj, dateRange.lastDateObj);
  }

  private getMonthName(month: number): string {
    return months[month];
  }

  private removeFirstCharIfZero(str: string): string {
    return str && str[0] === '0' ? str.slice(1) : str;
  }

  private getDateRange(forecasts: HasDatetimeInterface[]): { firstDateObj: DateObject; lastDateObj: DateObject } {
    const [firstDateObj, lastDateObj] = [
      forecasts[0].datetime,
      forecasts[forecasts.length - 1].datetime
    ].map(dateString => {
      const [year, month, day] = dateString.split("-");
      return {
        year,
        month,
        day: this.removeFirstCharIfZero(day)
      };
    });

    return { firstDateObj, lastDateObj };
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

}
