import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, exhaustMap, map, of, tap } from 'rxjs'
import { ICreateUser } from 'src/app/interfaces/create-user'
import { TypeAlert } from 'src/app/modules/alert/alert.interface'
import { AlertService } from 'src/app/modules/alert/services/alert.service'
import { UserService } from 'src/app/services/user.service'
import { getTicketFailureAction } from '../authorization/authorization.action'
import * as action from './create-user.action'

@Injectable()
export class CreateUserEffect {
  constructor(
    private service: UserService,
    private alert: AlertService,
    private actions$: Actions
  ) {}

  logActions$ = createEffect(
    () =>
      this.actions$.pipe(
        tap((action) => console.log('log action', action.type))
      ),
    { dispatch: false }
  )

  crateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.createUserAction),
      exhaustMap((model: { user: ICreateUser }) =>
        this.service.add(model.user).pipe(
          map(() => action.createUserSuccessAction()),
          catchError((er) => {
            console.error('response', er)
            let message = er.message
            if (er.error.error) {
              er.error.error.forEach((e: string) => {
                message = message + '</br>' + e
              })
            }
            if (er.error.errors) {
              let keys = Object.keys(er.error.errors)
              console.log('keys', keys)
              for (var key in keys) {
                console.log('key', er.error.errors[keys[key]])
                er.error.errors[keys[key]].forEach((element: string) => {
                  message = message + '</br>' + element
                })
              }
            }
            this.alert.add({
              message: message,
              type: TypeAlert.danger,
            })
            if (er.status === 401) {
              return of(getTicketFailureAction())
            }
            return of(action.createUserFailureAction())
          })
        )
      )
    )
  )

  crateUsertSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(action.createUserSuccessAction),
        tap(() => {
          this.alert.add({
            message: 'пользователь был создан успешно',
            type: TypeAlert.success,
          })
        })
      ),
    { dispatch: false }
  )
}
