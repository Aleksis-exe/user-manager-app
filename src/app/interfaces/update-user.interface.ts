export interface IUpadateUser {
  id: string
  userName: string
  email: string
  emailConfirmed: boolean
  phoneNumber: string
  lastName: string
  firstName: string
  fullName: string
  reversFullName: string
  lockout: boolean
  roles: IRole[]
}

export interface IRole {
  concurrencyStamp: string
  description: string | undefined
  id: string
  name: string
  normalizedName: string
}
