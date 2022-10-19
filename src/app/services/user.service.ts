import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { IUser } from '../context/users/interfaces/user.interface'
import { ICreateUser } from '../interfaces/create-user.interface'
import { IUpdateUserModel } from '../interfaces/update-model.interface'
import { IUpadateUser } from '../interfaces/update-user.interface'

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

  get(id: string): Observable<IUpadateUser> {
    const url = '/admin/api/User/' + id
    return this.http
      .get<IUpadateUser>(url)
      .pipe(map((user: IUpadateUser) => user))
  }

  update(model: IUpdateUserModel): Observable<IUpadateUser> {
    const url = '/admin/api/user/update'
    const form = new FormData()
    form.append('Id', model.Id)
    form.append('Email', model.Email)
    form.append('Phone', model.Phone)
    form.append('LastName', model.LastName)
    form.append('FirstName', model.FirstName)
    if (model.Avatar !== null) form.append('Avatar', model.Avatar)
    return this.http
      .put<IUpadateUser>(url, form)
      .pipe(map((user: IUpadateUser) => user))
  }

  changePasswor(idUser: string, pass: string) {
    const url = '/admin/api/User/changePassword'
    const form = new FormData()
    form.append('Id', idUser)
    form.append('NewPassword', pass)
    return this.http.post(url, form)
  }

  installRole(idUser: string, nameRole: string): Observable<IUpadateUser> {
    const url = '/admin/api/user/role/on'
    const form = new FormData()
    form.append('IdUser', idUser)
    form.append('RoleName', nameRole)
    return this.http
      .post<IUpadateUser>(url, form)
      .pipe(map((r): IUpadateUser => r))
  }

  uninstallRole(idUser: string, nameRole: string): Observable<IUpadateUser> {
    const url = '/admin/api/user/role/off'
    const form = new FormData()
    form.append('IdUser', idUser)
    form.append('RoleName', nameRole)
    return this.http
      .post<IUpadateUser>(url, form)
      .pipe(map((r): IUpadateUser => r))
  }
}
