export interface ITicket {
    key: string
    userName: string
    lastName: string
    firstName: string
    fullName: string
    reversFullName: string
    lockout: boolean
    roles: string[]
  }