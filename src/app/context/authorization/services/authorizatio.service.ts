import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { ITicket } from '../interfaces/ticket.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthorizatioService {
  constructor(private http: HttpClient) {}

  getTicket(): Observable<ITicket> {
    const url = '/ticket/get'
    return this.http.get<{ ticket: ITicket }>(url).pipe(
      map((response: { ticket: ITicket }) => {
        return response.ticket
      })
    )
  }
}
