import { Component, Input } from '@angular/core';

@Component({
  selector: 'big-weather-card',
  templateUrl: './big-weather-card.component.html',
  styleUrls: ['./big-weather-card.component.scss']
})
export class BigWeatherCardComponent {
  @Input() imgUrl: string = '';
  @Input() temperature: number = 0;
}
