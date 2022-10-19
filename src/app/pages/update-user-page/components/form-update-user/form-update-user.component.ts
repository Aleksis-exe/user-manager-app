import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { updateUserAction } from 'src/app/context/update-user/update-user.action'
import { IUpdateUserModel } from 'src/app/interfaces/update-model.interface'
import { IUpadateUser } from 'src/app/interfaces/update-user.interface'
import { maskString } from 'src/app/modules/expansion/expansion'

@Component({
  selector: 'form-update-user',
  templateUrl: './form-update-user.component.html',
  styleUrls: ['./form-update-user.component.scss'],
})
export class FormUpdateUserComponent implements OnInit {
  @Input('user') user$: IUpadateUser | null = null
  srcImage: string = ''
  form!: FormGroup
  blob: Blob | null = null

  constructor(private activateRoute: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValue()
  }

  initializeValue(): void {
    this.srcImage = '/icon/' + this.user$?.userName
  }

  initializeForm(): void {
    this.form = new FormGroup({
      lastName: new FormControl(this.user$?.lastName, Validators.required),
      firstName: new FormControl(this.user$?.firstName, Validators.required),
      email: new FormControl(this.user$?.email, Validators.email),
      phoneNumber: new FormControl(this.user$?.phoneNumber, [
        Validators.required,
        Validators.pattern(
          '[+7-8]{1,2}[(][0-9]{3}[)][0-9]{3}[-][0-9]{2}[-][0-9]{2}'
        ),
      ]),
      // file: new FormControl(),
    })
  }

  validator(controlName: string): string | undefined {
    if (
      this.form.get(controlName)?.invalid &&
      (this.form.get(controlName)?.touched || this.form.get(controlName)?.dirty)
    )
      return 'is-invalid'
    return
  }

  getImage(event: Event) {
    const element = event.currentTarget as HTMLInputElement
    if (element.files !== null) {
      const file: Blob = element.files[0]
      this.srcImage = URL.createObjectURL(file)
      this.blob = file
    }
  }

  onSubmit(): void {
    const id = this.activateRoute.snapshot.params['id']
    const user: IUpdateUserModel = {
      Id: id,
      Avatar: this.blob,
      Email: this.form.get('email')?.value,
      Phone: this.form.get('phoneNumber')?.value,
      LastName: this.form.get('lastName')?.value,
      FirstName: this.form.get('firstName')?.value,
    }
    this.store.dispatch(updateUserAction({ user }))
  }

  format(e: any) {
    console.log(e.target.value)
    console.log(maskString(e.target.value, '+7(###)###-##-##', '('))
    this.form.controls['phoneNumber'].setValue(
      maskString(e.target.value, '+#(###)###-##-##', '+()-')
    )
  }
}
