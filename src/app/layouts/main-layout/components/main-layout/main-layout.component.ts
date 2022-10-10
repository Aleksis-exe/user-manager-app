import { Component, Input, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import setup from 'package.json'
import { Observable } from 'rxjs'
import { ITicket } from 'src/app/context/authorization/interfaces/ticket.interface'
import * as authorizationSelect from 'src/app/context/authorization/authorization.select'

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  @Input('loading') loading$: boolean = true

  ticket$: Observable<ITicket | null> | undefined

  version: string = ''
  author: string = ''

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.version = setup.version.toString()
    this.author = setup.author.toString()
    this.ticket$ = this.store.pipe(select(authorizationSelect.ticketSelector))
  }

  getUserName(t: ITicket | null): string {
    if (t !== null) {
      if (t.fullName === ' ') return t.userName
      return t.fullName
    }
    return 'userName'
  }

  getIcon(t: ITicket | null): string {
    if (t !== null) return '/icon/' + t.userName
    return '/icon'
  }
}
