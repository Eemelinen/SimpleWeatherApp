import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

export type SelectOption = {
  value: string;
  label: string;
  imgSrc: string;
}

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent {
  @Input() options = ['option 1'];
  @Input() imageFolderUrl = 'assets/images/';
  @Output() currentValueChange = new EventEmitter();

  public currentValue: string = this.options[0];
  public dropdownOpen: boolean = false;
  public get dropdownElement(): Element {return this.elem.nativeElement.querySelector('.dropdown-list')}

  constructor(
    private elem: ElementRef
  ) { }

  ngOnInit(): void {
    this.currentValue = this.options[0];
  }

  closeDropdown() {
    this.dropdownElement.setAttribute('aria-expanded', "false");
    this.dropdownOpen = false;
  }

  select(value: any) {
    this.currentValue = value;
    this.closeDropdown();
    this.currentValueChange.emit(this.currentValue);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.dropdownElement.setAttribute('aria-expanded', this.dropdownOpen ? "true" : "false");
  }
}
