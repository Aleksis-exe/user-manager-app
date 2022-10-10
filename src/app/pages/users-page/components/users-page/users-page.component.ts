import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as usersSelect from 'src/app/context/users/users.select'
import * as usersAction from 'src/app/context/users/users.action'
import { IUser } from 'src/app/context/users/interfaces/user.interface'

@Component({
  selector: 'users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit {
  loading$: Observable<boolean> | undefined
  users$: Observable<IUser[] | null> | undefined

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(usersAction.getUsersAction())
    this.loading$ = this.store.pipe(select(usersSelect.loadingSelector))
    this.users$ = this.store.pipe(select(usersSelect.usersSelector))
  }
}
