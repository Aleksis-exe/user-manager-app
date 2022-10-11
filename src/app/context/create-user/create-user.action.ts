import { createAction, props } from '@ngrx/store'
import { ICreateUser } from 'src/app/interfaces/create-user'
import { ActionTypes } from './create-user.action-type'

export const createUserAction = createAction(
  ActionTypes.CREATE_USER,
  props<{ user: ICreateUser }>()
)

export const createUserSuccessAction = createAction(
  ActionTypes.CREATE_USER_SUCCESS
)

export const createUserFailureAction = createAction(
  ActionTypes.CREATE_USER_FAILURE
)
