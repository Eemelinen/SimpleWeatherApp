import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss']
})
export class SimpleFormComponent {
  @Input() dropdownImageFolder: string = 'assets/images';
  @Input() dropdownOptions: string[] = [];
  @Input() loading: boolean = false;
  @Input() placeholder: string = '';
  @Output() valuesChanged = new EventEmitter<SimpleFormOutput>();

  simpleForm: FormGroup = new FormGroup({
    dropdownValue: new FormControl(''),
    textInputValue: new FormControl('')
  });

  ngOnInit(): void {
    this.initForm();
    this.emitIfFormHasTextData();
  }

  setOption(dropdownValue: string) {
    this.simpleForm.patchValue({
      dropdownValue,
      textInputValue: ''
    })
  }

  /**
   * Emit form data with small delay if both dropdownValue and textInputValue are filled in
   */
  private emitIfFormHasTextData() {
    this.simpleForm.get('textInputValue')?.valueChanges.pipe(
      debounceTime(800)
    ).subscribe(() => this.valuesChanged.emit(this.simpleForm.value));
  }

  private initForm() {
    if (this.dropdownOptions.length > 0) {
      this.simpleForm = new FormGroup({
        dropdownValue: new FormControl(this.dropdownOptions[0] || ''),
        textInputValue: new FormControl(''),
      });
    }
  }
}
