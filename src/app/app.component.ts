import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as authorizationSelect from 'src/app/context/authorization/authorization.select'
import { getTicketAction } from './context/authorization/authorization.action'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
  loading$: Observable<boolean> | undefined

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getTicketAction())
    this.loading$ = this.store.pipe(select(authorizationSelect.loadingSelector))
  }
}
