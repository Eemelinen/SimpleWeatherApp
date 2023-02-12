import { Component, Input } from '@angular/core';

@Component({
  selector: 'extra-data-card',
  templateUrl: './extra-data-card.component.html',
  styleUrls: ['./extra-data-card.component.scss']
})
export class ExtraDataCardComponent {
  @Input() imgUrl: string = '';
  @Input() title: string = '';
  @Input() data: string | number = '';
}
