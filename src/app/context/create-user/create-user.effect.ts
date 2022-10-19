import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, exhaustMap, map, of, tap } from 'rxjs'
import { ErrorHandler } from 'src/app/error-handler'
import { ICreateUser } from 'src/app/interfaces/create-user.interface'
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
    private actions$: Actions,
    private errorHandler: ErrorHandler
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
            this.errorHandler.handler(er)
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
          this.alert.add(
            {
              message: 'пользователь был создан успешно',
              type: TypeAlert.success,
            },
            4000
          )
        })
      ),
    { dispatch: false }
  )
}
