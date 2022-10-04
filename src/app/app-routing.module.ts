import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AccessDeniedPageComponent } from './pages/access-denied-page/components/access-denied-page/access-denied-page.component'
import { UsersPageComponent } from './pages/users-page/components/users-page/users-page.component'

const routes: Routes = [
  { path: '', component: UsersPageComponent },
  { path: 'accessdenied', component: AccessDeniedPageComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
