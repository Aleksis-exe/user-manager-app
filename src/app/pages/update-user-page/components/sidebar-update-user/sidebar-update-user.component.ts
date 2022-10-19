import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { getUserAction } from 'src/app/context/update-user/update-user.action'

@Component({
  selector: 'sidebar-update-user',
  templateUrl: './sidebar-update-user.component.html',
  styleUrls: ['./sidebar-update-user.component.scss'],
})
export class SidebarUpdateUserComponent implements OnInit {
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {}

  close(): void {
    this.router.navigate(['/'])
  }

  updateModel(): void {
    const id = this.activateRoute.snapshot.params['id']
    this.store.dispatch(getUserAction({ id }))
  }
}
