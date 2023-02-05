import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-average-temperature-card',
  templateUrl: './average-temperature-card.component.html',
  styleUrls: ['./average-temperature-card.component.scss']
})
export class AverageTemperatureCardComponent {
  @Input() title: string = '';
  @Input() temperature: number = 0;
}
