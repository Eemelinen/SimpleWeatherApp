import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-extra-data-card',
  templateUrl: './extra-data-card.component.html',
  styleUrls: ['./extra-data-card.component.scss']
})
export class ExtraDataCardComponent {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() data: string = '';
}
