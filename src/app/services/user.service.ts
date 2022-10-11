import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { IUser } from '../context/users/interfaces/user.interface'
import { ICreateUser } from '../interfaces/create-user'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    /* if (typeof name === 'string') {
      const url = `/admin/api/users?search=${name}`
      return this.http
        .get<IUser[]>(url)
        .pipe(map((response: IUser[]) => response))
    }*/
    const url = '/admin/api/users'
    return this.http
      .get<IUser[]>(url)
      .pipe(map((response: IUser[]) => response))
  }

  add(user: ICreateUser) {
    const form = new FormData()
    form.append('Email', user.Email)
    form.append('UserName', user.UserName)
    form.append('Phone', user.PhoneNumber)
    form.append('FirstName', user.FirstName)
    form.append('LastName', user.LastName)
    form.append('Password', user.Password)
    if (user.Avatar) form.append('Avatar', user.Avatar)

    return this.http.post('/admin/api/users/create', form)
  }
}
