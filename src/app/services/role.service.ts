import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { IRole } from '../interfaces/update-user.interface'

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getRoles(): Observable<IRole[]> {
    const url = '/admin/api/role/all'
    return this.http.get<IRole[]>(url).pipe(map((r: IRole[]) => r))
  }
}
