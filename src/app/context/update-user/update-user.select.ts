import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IUpdateUserSate } from './update-user.reducer'

export const updateUserFeatureSelector =
  createFeatureSelector<IUpdateUserSate>('update-user')

export const loadingSelector = createSelector(
  updateUserFeatureSelector,
  (state: IUpdateUserSate) => state.loading
)

export const userSelector = createSelector(
  updateUserFeatureSelector,
  (state: IUpdateUserSate) => state.user
)

export const loadingAllRolesSelect = createSelector(
  updateUserFeatureSelector,
  (state: IUpdateUserSate) => state.loadingAllRoles
)

export const allRolesSelect = createSelector(
  updateUserFeatureSelector,
  (state: IUpdateUserSate) => state.allRoles
)
