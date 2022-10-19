import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { Modal } from 'bootstrap'
import { Observable } from 'rxjs'
import {
  getAllRolesAction,
  installRoleAction,
  uninstallRoleAction,
} from 'src/app/context/update-user/update-user.action'
import {
  allRolesSelect,
  loadingAllRolesSelect,
  userSelector,
} from 'src/app/context/update-user/update-user.select'
import { IRole, IUpadateUser } from 'src/app/interfaces/update-user.interface'
import { TypeAlert } from 'src/app/modules/alert/alert.interface'
import { AlertService } from 'src/app/modules/alert/services/alert.service'

@Component({
  selector: 'change-user-roles',
  templateUrl: './change-user-roles.component.html',
  styleUrls: ['./change-user-roles.component.scss'],
})
export class ChangeUserRolesComponent implements OnInit {
  user$: Observable<IUpadateUser | null> | undefined
  allRole$: Observable<IRole[]> | undefined
  loadingAllRole$: Observable<boolean> | undefined

  installRoleForm!: FormGroup
  uninstallRoleForm!: FormGroup

  constructor(
    private activateRoute: ActivatedRoute,
    private store: Store,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.initForm()
    this.user$ = this.store.pipe(select(userSelector))
    this.allRole$ = this.store.pipe(select(allRolesSelect))
    this.loadingAllRole$ = this.store.pipe(select(loadingAllRolesSelect))
  }

  initForm(): void {
    this.installRoleForm = new FormGroup({
      nameRole: new FormControl(null, Validators.required),
    })
    this.uninstallRoleForm = new FormGroup({
      nameRole: new FormControl(null, Validators.required),
    })
  }

  getRoles(u: IUpadateUser | null): IRole[] {
    if (u === null) return []
    return u.roles
  }

  open(): void {
    this.store.dispatch(getAllRolesAction())
    const myModalAlternative = new Modal('#exampleModal', {
      backdrop: 'static',
      keyboard: false,
      focus: true,
    })
    myModalAlternative.show()
  }

  installRole(): void {
    const role = this.installRoleForm.get('nameRole')
    if (!role?.valid) {
      this.alert.add(
        { message: 'группа не выбрана', type: TypeAlert.warning },
        5000
      )
      return
    }
    console.log('install role', role?.value)
    const idUser = this.activateRoute.snapshot.params['id']
    this.store.dispatch(installRoleAction({ idUser, nameRole: role.value }))
  }

  uninstallRole(): void {
    const role = this.uninstallRoleForm.get('nameRole')
    console.log('uninstall role', role?.value)
    if (!role?.valid) {
      this.alert.add(
        { message: 'группа не выбрана', type: TypeAlert.warning },
        5000
      )
      return
    }
    const idUser = this.activateRoute.snapshot.params['id']
    this.store.dispatch(uninstallRoleAction({ idUser, nameRole: role.value }))
  }
}
