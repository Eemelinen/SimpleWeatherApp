import { Component, Input } from '@angular/core';

@Component({
  selector: 'small-weather-card',
  templateUrl: './small-weather-card.component.html',
  styleUrls: ['./small-weather-card.component.scss']
})
export class SmallWeatherCardComponent {
  @Input() imgUrl: string = '';
  @Input() title: string = '';
  @Input() weatherDescription: string = '';
  @Input() temperature: number = 0;
}
