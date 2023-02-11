import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-temperature-card',
  templateUrl: './temperature-card.component.html',
  styleUrls: ['./temperature-card.component.scss']
})
export class TemperatureCardComponent {
  @Input() imgUrl: string = '';
  @Input() description: string = '';
  @Input() day: string = '';
  @Input() temperature: number = 0;
}
