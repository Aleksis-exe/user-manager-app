import { IUser } from './user.interface'

export interface IUsersState {
  loading: boolean
  users: IUser[] | null
}
