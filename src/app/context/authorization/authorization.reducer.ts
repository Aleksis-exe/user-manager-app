import { IAuthorizationState } from './interfaces/state.interface'
import { Action, createReducer, on } from '@ngrx/store'
import * as authorizationAction from './authorization.action'

const initialState: IAuthorizationState = {
  loading: false,
  ticket: null,
}

const reducer = createReducer(
  initialState,
  on(authorizationAction.getTicketAction, (state: IAuthorizationState) => ({
    ...state,
    loading: true,
  })),
  on(
    authorizationAction.getTicketSuccessAction,
    (state: IAuthorizationState, { ticket }) => ({
      ...state,
      ticket,
      loading: false,
    })
  ),
  on(authorizationAction.getTicketFailureAction, () => ({ ...initialState }))
)

export function authorizationReducer(
  state: IAuthorizationState,
  action: Action
): IAuthorizationState {
  return reducer(state, action)
}
