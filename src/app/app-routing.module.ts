import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AccessDeniedPageComponent } from './pages/access-denied-page/components/access-denied-page/access-denied-page.component'
import { CreateUserPageComponent } from './pages/create-user-page/components/create-user-page/create-user-page.component'
import { UpdateUserPageComponent } from './pages/update-user-page/components/update-user-page/update-user-page.component'
import { UsersPageComponent } from './pages/users-page/components/users-page/users-page.component'

const routes: Routes = [
  { path: '', component: UsersPageComponent },
  { path: 'accessdenied', component: AccessDeniedPageComponent },
  { path: 'create', component: CreateUserPageComponent },
  { path: 'update/:id', component: UpdateUserPageComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
