import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocationDataModel } from './location-data.model';

@Component({
  selector: 'app-location-picker-form',
  templateUrl: './location-picker-form.component.html',
  styleUrls: ['./location-picker-form.component.scss']
})
export class LocationPickerFormComponent {
  @Output() locationChanged = new EventEmitter<LocationDataModel>();
  @Input() countries: string[] = [];
  @Input() loading: boolean = false;

  emitLocationData(formData: SimpleFormOutput) {
    const { dropdownValue, textInputValue } = formData;
    this.locationChanged.emit(new LocationDataModel(dropdownValue, textInputValue));
  }
}
