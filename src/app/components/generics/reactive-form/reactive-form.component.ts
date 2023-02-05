import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent {
  @Input() dropdownImageFolder: string = 'assets/images';
  @Input() dropdownOptions: string[] = [];
  @Input() loading: boolean = false;
  @Input() placeholder: string = '';
  @Output() valuesChanged = new EventEmitter<SimpleFormOutput>();

  form: FormGroup = new FormGroup({
    dropdownValue: new FormControl(''),
    textInputValue: new FormControl('')
  });

  ngOnInit(): void {
    this.initForm();
    this.emitIfFormHasTextData();
  }

  setOption(dropdownValue: string) {
    this.form.patchValue({
      dropdownValue,
      textInputValue: ''
    })
  }

  /**
   * Emit form data with small delay if both dropdownValue and textInputValue are filled in
   */
  private emitIfFormHasTextData() {
    this.form.get('textInputValue')?.valueChanges.pipe(
      debounceTime(800)
    ).subscribe(() => this.valuesChanged.emit(this.form.value));
  }

  private initForm() {
    if (this.dropdownOptions.length > 0) {
      this.form = new FormGroup({
        dropdownValue: new FormControl(this.dropdownOptions[0] || ''),
        textInputValue: new FormControl(''),
      });
    }
  }
}
