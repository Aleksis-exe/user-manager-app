import { createAction, props } from '@ngrx/store'
import { IChangePasswor } from 'src/app/interfaces/change-passwor.interface'
import { IUpdateUserModel } from 'src/app/interfaces/update-model.interface'
import { IRole, IUpadateUser } from 'src/app/interfaces/update-user.interface'
import { ActionTypes } from './update-user.action-types'

export const getUserAction = createAction(
  ActionTypes.GET_USER,
  props<{ id: string }>()
)

export const getUserSuccessAction = createAction(
  ActionTypes.GET_USER_SUCCESS,
  props<{ user: IUpadateUser }>()
)
export const getUserFailureAction = createAction(ActionTypes.GET_USER_FAILURE)

export const updateUserAction = createAction(
  ActionTypes.UPDATE_USER,
  props<{ user: IUpdateUserModel }>()
)

export const updateUserSuccessAction = createAction(
  ActionTypes.UPDATE_USER_SUCCESS,
  props<{ user: IUpadateUser }>()
)

export const updateUserFailureAction = createAction(
  ActionTypes.UPDATE_USER_FAILURE
)

export const changePassworAction = createAction(
  ActionTypes.CHANGE_PASSWORD,
  props<{ model: IChangePasswor }>()
)

export const changePassworSuccessAction = createAction(
  ActionTypes.CHANGE_PASSWORD_SUCCESS
)

export const changePassworFailureAction = createAction(
  ActionTypes.CHANGE_PASSWORD_FAILURE
)

export const getAllRolesAction = createAction(ActionTypes.GET_ALL_ROLES)

export const getAllRolesSuccessAction = createAction(
  ActionTypes.GET_ALL_ROLES_SUCCESS,
  props<{ roles: IRole[] }>()
)

export const getAllRolesFailureAction = createAction(
  ActionTypes.GET_ALL_ROLES_FAILURE
)

export const installRoleAction = createAction(
  ActionTypes.INSTALL_ROLE,
  props<{ idUser: string; nameRole: string }>()
)

export const installRoleSuccessAction = createAction(
  ActionTypes.INSTALL_ROLE_SUCCESS,
  props<{ user: IUpadateUser }>()
)

export const installRoleFailureAction = createAction(
  ActionTypes.INSTALL_ROLE_FAILURE
)

export const uninstallRoleAction = createAction(
  ActionTypes.UNINSTALL_ROLE,
  props<{ idUser: string; nameRole: string }>()
)

export const uninstallRoleSuccessAction = createAction(
  ActionTypes.UNINSTALL_ROLE_SUCCESS,
  props<{ user: IUpadateUser }>()
)

export const uninstallRoleFailureAction = createAction(
  ActionTypes.UPDATE_USER_FAILURE
)
