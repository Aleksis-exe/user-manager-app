import { Component, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { loadingSelector } from 'src/app/context/authorization/authorization.select'
import { createUserAction } from 'src/app/context/create-user/create-user.action'
import { ICreateUser } from 'src/app/interfaces/create-user'
import { maskString } from 'src/app/modules/expansion/expansion'

@Component({
  selector: 'create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.scss'],
})
export class CreateUserPageComponent implements OnInit {
  loading$: Observable<boolean> | undefined
  form!: FormGroup
  blob: Blob | null = null // тут будет хранится портрет пользователя
  srcImage: string = 'favicon.ico'

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(loadingSelector))
    this.form = new FormGroup(
      {
        userName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        firstName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.email),
        phoneNumber: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '[+7-8]{1,2}[(][0-9]{3}[)][0-9]{3}[-][0-9]{2}[-][0-9]{2}'
          ),
        ]),
        password: new FormControl('', Validators.required),
        passwordConfirmation: new FormControl('', Validators.required),
        file: new FormControl(),
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

  format(e: any) {
    console.log(e.target.value)
    console.log(maskString(e.target.value, '+7(###)###-##-##', '('))
    this.form.controls['phoneNumber'].setValue(
      maskString(e.target.value, '+#(###)###-##-##', '+()-')
    )
  }

  close(): void {
    this.router.navigate(['/'])
  }

  onSubmit(): void {
    console.log('on submit')
    const user: ICreateUser = {
      Avatar: this.blob,
      UserName: this.form.get('userName')?.value,
      FirstName: this.form.get('firstName')?.value,
      LastName: this.form.get('lastName')?.value,
      PhoneNumber: this.form.get('phoneNumber')?.value,
      Email: this.form.get('email')?.value,
      Password: this.form.get('password')?.value,
    }
    this.store.dispatch(createUserAction({user}))
  }

  buffSrcImage() {
    return (datUrl: string): void => {
      this.setSrcImage(datUrl)
    }
  }

  setSrcImage(dataUrl: string = ''): void {
    this.srcImage = this.toSrcImage(dataUrl)
  }

  toSrcImage(dataUrl: string = ''): string {
    // if (dataUrl === '') {
    //   return `${environment.apiUrl}/icon/${this.hero?.id}?dd=${
    //     Math.random() % 1000
    //   }`
    // }
    return dataUrl
  }

  getImage(event: Event): void {
    const element = event.currentTarget as HTMLInputElement
    let fileList: FileList | null = element.files
    const buf = this.buffSrcImage()
    if (fileList) {
      this.blob = fileList[0]
      let reader = new FileReader()
      reader.readAsDataURL(fileList[0])
      reader.onload = function () {
        if (typeof reader.result === 'string') buf(reader.result)
      }
      reader.onerror = function () {
        console.log(reader.error)
      }
    }
  }
}
