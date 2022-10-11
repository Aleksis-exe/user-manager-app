import { Action, createReducer, on } from '@ngrx/store'
import * as action from './create-user.action'

const initialState: ICreateUserState = {
  loading: false,
}

const reducer = createReducer(
  initialState,
  on(action.createUserAction, () => ({ loading: true })),
  on(action.createUserSuccessAction, () => ({
    loading: false,
  })),
  on(action.createUserFailureAction, () => ({
    ...initialState,
  }))
)

export function createUserReducer(
  state: ICreateUserState,
  action: Action
): ICreateUserState {
  return reducer(state, action)
}

export interface ICreateUserState {
  loading: boolean
}
