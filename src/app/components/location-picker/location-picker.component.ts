import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocationDataModel } from './location-data.model';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss']
})
export class LocationPickerComponent {
  @Output() locationChanged = new EventEmitter<LocationDataModel>();
  @Input() countries: string[] = [];
  @Input() loading: boolean = false;

  emitLocationData(formData: SimpleFormOutput) {
    const { dropdownValue, textInputValue } = formData;
    this.locationChanged.emit(new LocationDataModel(dropdownValue, textInputValue));
  }
}
