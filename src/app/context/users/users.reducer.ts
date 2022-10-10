import { Action, createReducer, on } from '@ngrx/store'
import { IUsersState } from './interfaces/state.interface'
import * as usersAction from './users.action'

const initialState: IUsersState = {
  loading: false,
  users: null,
}

const reducer = createReducer(
  initialState,
  on(usersAction.getUsersAction, (state: IUsersState) => ({
    ...state,
    loading: true,
  })),
  on(usersAction.getUsersSuccessAction, (state: IUsersState, action) => ({
    users: action.users,
    loading: false,
  })),
  on(usersAction.getUsersFailureAction, (state: IUsersState) => ({
    ...initialState,
  }))
)

export function usersReducer(state: IUsersState, action: Action): IUsersState {
  return reducer(state, action)
}
