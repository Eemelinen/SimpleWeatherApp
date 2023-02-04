import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-location-picker-form',
  templateUrl: './location-picker-form.component.html',
  styleUrls: ['./location-picker-form.component.scss']
})
export class LocationPickerFormComponent implements OnInit {
  @Output() locationEvent = new EventEmitter<LocationData>();
  @Input() countries: string[] = [];
  @Input() loading: boolean = false;
  locationForm: FormGroup = new FormGroup({country: new FormControl(''), city: new FormControl('')});

  ngOnInit(): void {
    this.initForm();
    this.emitIfHasCity();
  }

  setCountry(country: string) {
    this.locationForm.patchValue({
      country,
      city: ''
    })
  }

  /**
    * Emit form data if both country and city are filled in
   */
  private emitIfHasCity() {
    this.locationForm.get('city')?.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(() => this.locationEvent.emit(this.locationForm.value));
  }

  private initForm() {
    if (this.countries.length > 0) {
      this.locationForm = new FormGroup({
        country: new FormControl(this.countries[0] || ''),
        city: new FormControl(''),
      });
    }
  }
}
