import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

type Country = {
  name: string;
  code: string;
}

@Component({
  selector: 'app-location-picker-form',
  templateUrl: './location-picker-form.component.html',
  styleUrls: ['./location-picker-form.component.scss']
})
export class LocationPickerFormComponent implements OnInit, OnDestroy {
  locationForm: FormGroup;
  subscriptions: Subscription[] = [];
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
    this.onChanges();
  }

  // Todo: create custom async validator for city
  onChanges(): void {
    this.subscriptions.push(this.locationForm.valueChanges.subscribe(val => {
      console.log(val);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
