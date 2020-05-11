import { FormGroup, FormControl, Validators, /*FormGroupDirective, NgForm*/ } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export const EmailValidation = [Validators.required, Validators.email];
export const PasswordValidation = [
  Validators.required,
  Validators.minLength(6),
  Validators.maxLength(24),
 // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
];

export const AgeValidation =  [null, [
  Validators.required,
  Validators.minLength(2),
  Validators.min(18),
  Validators.max(65)
]];
export const AgreeValidation = [false, [
  Validators.requiredTrue
]];
export class RepeatPasswordEStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null,/* form: FormGroupDirective | NgForm | null*/): boolean {
    return (control && control.parent.get('password').value !== control.parent.get('passwordAgain').value && control.dirty);
  }
}
export function RepeatPasswordValidator(group: FormGroup) {
  const password = group.controls.password.value;
  const passwordConfirmation = (group.controls.passwordAgain) ? group.controls.passwordAgain.value : null;

  return password === passwordConfirmation ? null : { passwordsNotEqual: true };
}
