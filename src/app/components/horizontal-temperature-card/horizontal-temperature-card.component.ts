import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-horizontal-temperature-card',
  templateUrl: './horizontal-temperature-card.component.html',
  styleUrls: ['./horizontal-temperature-card.component.scss']
})
export class HorizontalTemperatureCardComponent {
  @Input() imgUrl: string = '';
  @Input() temperature: number = 0;
}
