export interface ICreateUser {
  Email: string
  UserName: string
  LastName: string
  FirstName: string
  PhoneNumber: string
  Password: string
  Avatar: Blob | null
}
