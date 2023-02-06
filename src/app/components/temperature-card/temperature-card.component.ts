import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-temperature-card',
  templateUrl: './temperature-card.component.html',
  styleUrls: ['./temperature-card.component.scss']
})
export class TemperatureCardComponent {
  @Input() bigCard = false;
  @Input() title: string = '';
  @Input() temperature: number = 0;
}
