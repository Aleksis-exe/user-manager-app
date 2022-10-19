import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { getUserAction } from 'src/app/context/update-user/update-user.action'
import {
  loadingSelector,
  userSelector,
} from 'src/app/context/update-user/update-user.select'
import { IUpadateUser } from 'src/app/interfaces/update-user.interface'

@Component({
  selector: 'update-user-page',
  templateUrl: './update-user-page.component.html',
  styleUrls: ['./update-user-page.component.scss'],
})
export class UpdateUserPageComponent implements OnInit {
  user$: Observable<IUpadateUser | null> | undefined
  loading$: Observable<boolean> | undefined

  constructor(private activateRoute: ActivatedRoute, private store: Store) {}

  getUser(u: IUpadateUser | null): IUpadateUser | null {
    return u
  }

  ngOnInit(): void {
    const id = this.activateRoute.snapshot.params['id']
    this.store.dispatch(getUserAction({ id }))
    this.user$ = this.store.pipe(select(userSelector))
    this.loading$ = this.store.pipe(select(loadingSelector))
  }
}
