import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-location-picker-form',
  templateUrl: './location-picker-form.component.html',
  styleUrls: ['./location-picker-form.component.scss']
})
export class LocationPickerFormComponent implements OnInit {
  @Output() locationEvent = new EventEmitter<LocationPickerOutput>();
  locationForm: FormGroup;
  countries: Country[] = [
    { name: 'NL', code: 'NL' },
    { name: 'US', code: 'US' },
  ];

  constructor() {
    this.locationForm = new FormGroup({
      country: new FormControl(this.countries[0]?.code || ''),
      city: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.emptyCityOnCountryChange();
    this.emitIfHasCity();
  }

  private emptyCityOnCountryChange() {
    this.locationForm.get('country')?.valueChanges.subscribe(() => {
      this.locationForm.get('city')?.setValue('');
    });
  }

  /*
    * Emit form data if both country and city are filled in
   */
  private emitIfHasCity() {
    this.locationForm.get('city')?.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(() => {
      const formData = this.locationForm.value;
      if (formData.country && formData.city) {
        this.locationEvent.emit(formData);
      }
    });
  }
}
