import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { IUser } from '../context/users/interfaces/user.interface'

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
}
