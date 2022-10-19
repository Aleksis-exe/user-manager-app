import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, exhaustMap, map, of, tap } from 'rxjs'
import { ErrorHandler } from 'src/app/error-handler'
import { IChangePasswor } from 'src/app/interfaces/change-passwor.interface'
import { IUpdateUserModel } from 'src/app/interfaces/update-model.interface'
import { IUpadateUser } from 'src/app/interfaces/update-user.interface'
import { TypeAlert } from 'src/app/modules/alert/alert.interface'
import { AlertService } from 'src/app/modules/alert/services/alert.service'
import { RoleService } from 'src/app/services/role.service'
import { UserService } from 'src/app/services/user.service'
import { getTicketFailureAction } from '../authorization/authorization.action'
import * as action from './update-user.action'

@Injectable()
export class UpdateUserEffect {
  constructor(
    private service: UserService,
    private alert: AlertService,
    private actions$: Actions,
    private errorHandler: ErrorHandler,
    private roleService: RoleService
  ) {}

  logActions$ = createEffect(
    () =>
      this.actions$.pipe(
        tap((action) => console.log('log action', action.type))
      ),
    { dispatch: false }
  )

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.getUserAction),
      exhaustMap((model: { id: string }) =>
        this.service.get(model.id).pipe(
          map((user: IUpadateUser) => action.getUserSuccessAction({ user })),
          catchError((er) => {
            this.errorHandler.handler(er)
            if (er.status === 401) {
              return of(getTicketFailureAction())
            }
            return of(action.getUserFailureAction())
          })
        )
      )
    )
  )

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.updateUserAction),
      exhaustMap((model: { user: IUpdateUserModel }) =>
        this.service.update(model.user).pipe(
          map((user: IUpadateUser) => action.updateUserSuccessAction({ user })),
          catchError((er) => {
            this.errorHandler.handler(er)
            if (er.status === 401) {
              return of(getTicketFailureAction())
            }
            return of(action.updateUserFailureAction())
          })
        )
      )
    )
  )

  changePasswor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.changePassworAction),
      exhaustMap((user: { model: IChangePasswor }) =>
        this.service.changePasswor(user.model.idUser, user.model.pass).pipe(
          map(() => action.changePassworSuccessAction()),
          catchError((er) => {
            this.errorHandler.handler(er)
            if (er.status === 401) {
              return of(getTicketFailureAction())
            }
            return of(action.changePassworFailureAction())
          })
        )
      )
    )
  )

  changePassworSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(action.changePassworSuccessAction),
        tap(() => {
          this.alert.add(
            {
              message: 'пароль изменен',
              type: TypeAlert.success,
            },
            4000
          )
        })
      ),
    { dispatch: false }
  )

  getAllRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.getUserAction),
      exhaustMap(() =>
        this.roleService.getRoles().pipe(
          map((roles) => action.getAllRolesSuccessAction({ roles })),
          catchError((er) => {
            this.errorHandler.handler(er)
            if (er.status === 401) {
              return of(getTicketFailureAction())
            }
            return of(action.getAllRolesFailureAction())
          })
        )
      )
    )
  )

  ///   ---- install role  ----
  installRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.installRoleAction),
      exhaustMap((model) =>
        this.service.installRole(model.idUser, model.nameRole).pipe(
          map((user) => action.installRoleSuccessAction({ user })),
          catchError((er) => {
            this.errorHandler.handler(er)
            if (er.status === 401) {
              return of(getTicketFailureAction())
            }
            return of(action.installRoleFailureAction())
          })
        )
      )
    )
  )

  installRoleSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(action.installRoleSuccessAction),
        tap(() => {
          this.alert.add(
            {
              message: 'группа установлена',
              type: TypeAlert.success,
            },
            3000
          )
        })
      ),
    { dispatch: false }
  )

  ///   ----  uninstall role ----
  uninstallRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.uninstallRoleAction),
      exhaustMap((model) =>
        this.service.uninstallRole(model.idUser, model.nameRole).pipe(
          map((user) => action.uninstallRoleSuccessAction({ user })),
          catchError((er) => {
            this.errorHandler.handler(er)
            if (er.status === 401) {
              return of(getTicketFailureAction())
            }
            return of(action.uninstallRoleFailureAction())
          })
        )
      )
    )
  )

  uninstallRoleSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(action.uninstallRoleSuccessAction),
        tap(() => {
          this.alert.add(
            {
              message: 'группа отключена',
              type: TypeAlert.success,
            },
            3000
          )
        })
      ),
    { dispatch: false }
  )
}
