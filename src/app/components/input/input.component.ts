import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ResultError } from './input.interface';


/**
   * Component untuk input
   * @Type Text, Email
   * @Input id 
   * @Input name
   * @Input formControlName
   * @Input type
   * @Input placeholder (optional)
   * @Input inputClass
   * @Input maxlength (optional)
   * @Input minlength (optional)
   * @Input hasError
   * @Input messagePatternError (optional)
  */
@Component({
  selector: 'gx-input',
  imports: [
    CommonModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})

export class InputComponent implements ControlValueAccessor, OnChanges {
  @Input() formControlName!: string;
  @Input() id!: string;
  @Input() name!: string;
  @Input() placeholder!: string;
  @Input() type!: string;
  @Input() inputClass!: string;
  @Input() maxlength!: number;
  @Input() minlength!: number;
  @Input() hasError!: ResultError;
  @Input() messagePatternError!: string;

  value: string = '';
  onChange: (value: any) => void = () => { };
  onTouched: () => void = () => { };

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hasError']) {
    }
  }

  writeValue(obj: any): void {
    this.value = obj
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {

  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

}
