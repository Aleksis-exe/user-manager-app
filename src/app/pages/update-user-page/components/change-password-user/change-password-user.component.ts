import { Component, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { changePassworAction } from 'src/app/context/update-user/update-user.action'

@Component({
  selector: 'change-password-user',
  templateUrl: './change-password-user.component.html',
  styleUrls: ['./change-password-user.component.scss'],
})
export class ChangePasswordUserComponent implements OnInit {
  form!: FormGroup

  constructor(private store: Store, private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        password: new FormControl('', Validators.required),
        passwordConfirmation: new FormControl('', Validators.required),
      },
      { validators: this.matchingPasswordsValidator }
    )
  }

  matchingPasswordsValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const pass = control.get('password')
    const confirm = control.get('passwordConfirmation')
    return pass?.value === confirm?.value ? null : { matchingPasswords: true }
  }

  validatorPasswords(controlName: string): string | undefined {
    if (this.form.errors?.['matchingPasswords']) return 'is-invalid'
    return this.validator(controlName)
  }

  validator(controlName: string): string | undefined {
    if (
      this.form.get(controlName)?.invalid &&
      (this.form.get(controlName)?.touched || this.form.get(controlName)?.dirty)
    )
      return 'is-invalid'
    return
  }

  onSubmit() {
    const id = this.activateRoute.snapshot.params['id']
    this.store.dispatch(
      changePassworAction({
        model: {
          idUser: id,
          pass: this.form.get('passwordConfirmation')?.value,
        },
      })
    )
    this.form.get('password')?.setValue('')
    this.form.get('passwordConfirmation')?.setValue('')
  }
}
