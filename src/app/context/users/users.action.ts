import { createAction, props } from '@ngrx/store'
import { IUser } from './interfaces/user.interface'
import { ActionTypes } from './users.action-types'

export const getUsersAction = createAction(
  ActionTypes.GET_USERS
)

export const getUsersSuccessAction = createAction(
  ActionTypes.GET_USERS_SUCCESS,
  props<{ users: IUser[] }>()
)

export const getUsersFailureAction = createAction(ActionTypes.GET_USERS_FAILURE)
