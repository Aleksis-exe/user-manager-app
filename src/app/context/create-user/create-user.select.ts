import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ICreateUserState } from './create-user.reducer'

export const createUserFeatureSelector =
  createFeatureSelector<ICreateUserState>('create-user')

export const loadingSelector = createSelector(
  createUserFeatureSelector,
  (state: ICreateUserState) => state.loading
)
