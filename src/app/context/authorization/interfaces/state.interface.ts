import { ITicket } from './ticket.interface'

export interface IAuthorizationState {
  loading: boolean
  ticket: ITicket | null
}
