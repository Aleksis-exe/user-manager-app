import { createFeatureSelector, createSelector } from "@ngrx/store"
import { IAuthorizationState } from "./interfaces/state.interface"

export const authorizationFeatureSelector =
  createFeatureSelector<IAuthorizationState>('authorization')

export const loadingSelector = createSelector(
  authorizationFeatureSelector,
  (state: IAuthorizationState) => state.loading
)

export const ticketSelector = createSelector(
  authorizationFeatureSelector,
  (state: IAuthorizationState) => state.ticket
)