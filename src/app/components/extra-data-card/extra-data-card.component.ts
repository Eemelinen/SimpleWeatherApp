import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-extra-data-card',
  templateUrl: './extra-data-card.component.html',
  styleUrls: ['./extra-data-card.component.scss']
})
export class ExtraDataCardComponent implements OnInit {
  @Input() imgUrl: string = '';
  @Input() title: string = '';
  @Input() data: string | number = '';

  ngOnInit(): void {
    console.log(this.imgUrl)
  }
}
