import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IUsersState } from './interfaces/state.interface'

export const usersFeatureSelector = createFeatureSelector<IUsersState>('users')

export const loadingSelector = createSelector(
  usersFeatureSelector,
  (state: IUsersState) => state.loading
)
export const usersSelector = createSelector(
  usersFeatureSelector,
  (state: IUsersState) => state.users
)
