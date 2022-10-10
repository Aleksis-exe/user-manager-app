import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, exhaustMap, map, of, tap } from 'rxjs'
import { TypeAlert } from 'src/app/modules/alert/alert.interface'
import { AlertService } from 'src/app/modules/alert/services/alert.service'
import {
  getTicketAction,
  getTicketFailureAction,
  getTicketSuccessAction,
} from './authorization.action'
import { ITicket } from './interfaces/ticket.interface'
import { AuthorizatioService } from './services/authorizatio.service'

@Injectable()
export class AuthorizationEffect {
  constructor(
    private service: AuthorizatioService,
    private actions$: Actions,
    private router: Router,
    private alert: AlertService
  ) {}

  logActions$ = createEffect(
    () =>
      this.actions$.pipe(
        tap((action) => console.log('log action', action.type))
      ),
    { dispatch: false }
  )

  ticket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTicketAction),
      exhaustMap(() =>
        this.service.getTicket().pipe(
          map((ticket: ITicket) => getTicketSuccessAction({ ticket })),
          catchError((r) => {
            console.error('response', r)
            this.alert.add(
              {
                message: r.message,
                type: TypeAlert.danger,
              },
              3500
            )
            return of(getTicketFailureAction())
          })
        )
      )
    )
  )

  getTicketSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getTicketSuccessAction),
        tap(() => {
          this.router.navigate(['/'])
        })
      ),
    { dispatch: false }
  )

  getTicketFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getTicketFailureAction),
        tap(() => {
          this.router.navigate(['/accessdenied']) //
        })
      ),
    { dispatch: false }
  )
}
