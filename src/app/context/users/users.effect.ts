import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, exhaustMap, map, of, tap } from 'rxjs'
import { TypeAlert } from 'src/app/modules/alert/alert.interface'
import { AlertService } from 'src/app/modules/alert/services/alert.service'
import { UserService } from 'src/app/services/user.service'
import { getTicketFailureAction } from '../authorization/authorization.action'
import * as usersAction from './users.action'

@Injectable()
export class UsersEffect {
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

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersAction.getUsersAction),
      exhaustMap(() =>
        this.service.getUsers().pipe(
          map((users) => usersAction.getUsersSuccessAction({ users })),
          catchError((er) => {
            console.error('response', er)
            this.alert.add({
              message: er.message,
              type: TypeAlert.danger,
            })
            if (er.status === 401) {
              return of(getTicketFailureAction())
            }
            return of(usersAction.getUsersFailureAction())
          })
        )
      )
    )
  )
}
