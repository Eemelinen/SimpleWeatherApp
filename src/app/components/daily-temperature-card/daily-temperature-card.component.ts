import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-daily-temperature-card',
  templateUrl: './daily-temperature-card.component.html',
  styleUrls: ['./daily-temperature-card.component.scss']
})
export class DailyTemperatureCardComponent {
  @Input() forecast: WeatherData = {} as WeatherData;

  getTemperature(): number {
    return Math.round(this.forecast.temp);
  }

  getDayName(): string {
    const day = new Date(this.forecast.date).getDay();
    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    return days[day];
  }

}
