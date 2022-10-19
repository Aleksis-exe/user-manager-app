import { Action, createReducer, on } from '@ngrx/store'
import { IRole, IUpadateUser } from 'src/app/interfaces/update-user.interface'
import * as action from './update-user.action'

const initialState: IUpdateUserSate = {
  loading: false,
  user: null,
  loadingAllRoles: false,
  allRoles: [],
}

const reducer = createReducer(
  initialState,
  on(action.getUserAction, (state: IUpdateUserSate) => ({
    ...state,
    loading: true,
  })),
  on(action.getUserSuccessAction, (state: IUpdateUserSate, action) => ({
    ...state,
    loading: false,
    user: action.user,
  })),
  on(action.getUserFailureAction, () => ({ ...initialState })),
  on(action.updateUserAction, (state: IUpdateUserSate) => ({
    ...state,
    loading: true,
  })),
  on(action.updateUserSuccessAction, (state: IUpdateUserSate, action) => ({
    ...state,
    loading: false,
    user: action.user,
  })),
  on(action.updateUserFailureAction, (state: IUpdateUserSate) => ({
    ...state,
    loading: false,
  })),
  on(action.changePassworAction, (state: IUpdateUserSate) => ({
    ...state,
    loading: true,
  })),
  on(action.changePassworSuccessAction, (state: IUpdateUserSate) => ({
    ...state,
    loading: false,
  })),
  on(action.changePassworFailureAction, (state: IUpdateUserSate) => ({
    ...state,
    loading: false,
  })),
  on(action.getAllRolesAction, (state: IUpdateUserSate) => ({
    ...state,
    loadingAllRoles: true,
  })),
  on(action.getAllRolesSuccessAction, (state: IUpdateUserSate, action) => ({
    ...state,
    loadingAllRoles: false,
    allRoles: action.roles,
  })),
  on(action.getAllRolesFailureAction, (state: IUpdateUserSate) => ({
    ...state,
    loadingAllRoles: false,
    allRoles: [],
  })),
  on(action.installRoleAction, (state: IUpdateUserSate) => ({
    ...state,
    loading: false,
  })),
  on(action.installRoleSuccessAction, (state: IUpdateUserSate, action) => ({
    ...state,
    loading: false,
    user: action.user,
  })),
  on(action.installRoleFailureAction, (state: IUpdateUserSate) => ({
    ...state,
    loading: false,
  })),
  on(action.uninstallRoleAction, (state: IUpdateUserSate) => ({
    ...state,
    loading: false,
  })),
  on(action.uninstallRoleSuccessAction, (state: IUpdateUserSate, action) => ({
    ...state,
    loading: false,
    user: action.user,
  })),
  on(action.uninstallRoleFailureAction, (state: IUpdateUserSate) => ({
    ...state,
    loading: false,
  }))
)

export function updateUserReducer(
  state: IUpdateUserSate,
  action: Action
): IUpdateUserSate {
  return reducer(state, action)
}

export interface IUpdateUserSate {
  loading: boolean
  user: IUpadateUser | null
  loadingAllRoles: boolean
  allRoles: IRole[]
}
