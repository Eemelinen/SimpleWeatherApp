import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-daily-temperature-card',
  templateUrl: './daily-temperature-card.component.html',
  styleUrls: ['./daily-temperature-card.component.scss']
})
export class DailyTemperatureCardComponent {
  @Input() title: string = '';
  @Input() temperature: number = 0;
}
