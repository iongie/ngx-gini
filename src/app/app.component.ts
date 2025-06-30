import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { InputComponent } from "./components/input/input.component";

@Component({
  selector: 'gx-root',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>;
  testForm!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.myForm()
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  myForm() {
    this.testForm = this.fb.group({
      'email': [{ value: null, disabled: false }, [Validators.required, Validators.email]],
      'name': [{ value: null, disabled: false }, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      'rt': [{ value: null, disabled: false }, [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]]
    })
  }

  getControl(controlName: string) {
    return this.testForm.get(controlName)!;
  }

  hasError(controlName: string) {
    const control = this.getControl(controlName);
    return {
      value: control.dirty || control.touched,
      desc: control.errors!
    };
  }

  submit() {
    if (this.testForm.invalid) {
      this.testForm.markAllAsTouched(); // <--- ini kunci utamanya
      return;
    }
  }
}
