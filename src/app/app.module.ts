import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { StoreModule } from '@ngrx/store'
import { MainLayoutComponent } from './layouts/main-layout/components/main-layout/main-layout.component'
import { UsersPageComponent } from './pages/users-page/components/users-page/users-page.component'
import { AppRoutingModule } from './app-routing.module'
import { HeaderComponent } from './layouts/main-layout/components/header/header.component'
import { AlertModule } from './modules/alert/alert.module'
import { authorizationReducer } from './context/authorization/authorization.reducer'
import { EffectsModule } from '@ngrx/effects'
import { AccessDeniedPageComponent } from './pages/access-denied-page/components/access-denied-page/access-denied-page.component'
import { CentrLayoutComponent } from './layouts/centr-layout/components/centr-layout/centr-layout.component'
import { AuthorizationEffect } from './context/authorization/authorization.effect'
import { HttpClientModule } from '@angular/common/http'
import { usersReducer } from './context/users/users.reducer'
import { UsersEffect } from './context/users/users.effect'
import { LoadingComponent } from './layouts/main-layout/components/loading/loading.component'
import { SidebarComponent } from './pages/users-page/components/sidebar/sidebar.component'
import { CreateUserPageComponent } from './pages/create-user-page/components/create-user-page/create-user-page.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { createUserReducer } from './context/create-user/create-user.reducer'
import { CreateUserEffect } from './context/create-user/create-user.effect'
import { UpdateUserPageComponent } from './pages/update-user-page/components/update-user-page/update-user-page.component'
import { SidebarUpdateUserComponent } from './pages/update-user-page/components/sidebar-update-user/sidebar-update-user.component'
import { FormUpdateUserComponent } from './pages/update-user-page/components/form-update-user/form-update-user.component'
import { SidebarCreateUserComponent } from './pages/create-user-page/components/sidebar-create-user/sidebar-create-user.component'
import { updateUserReducer } from './context/update-user/update-user.reducer'
import { ErrorHandler } from './error-handler'
import { UpdateUserEffect } from './context/update-user/update-user.effect'
import { SafePipeModule } from './modules/safe-pipe/safe-pipe.module';
import { ChangePasswordUserComponent } from './pages/update-user-page/components/change-password-user/change-password-user.component';
import { ChangeUserRolesComponent } from './pages/update-user-page/components/change-user-roles/change-user-roles.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainLayoutComponent,
    CentrLayoutComponent,
    UsersPageComponent,
    AccessDeniedPageComponent,
    LoadingComponent,
    SidebarComponent,
    CreateUserPageComponent,
    UpdateUserPageComponent,
    SidebarUpdateUserComponent,
    FormUpdateUserComponent,
    SidebarCreateUserComponent,
    ChangePasswordUserComponent,
    ChangeUserRolesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('authorization', authorizationReducer),
    StoreModule.forFeature('users', usersReducer),
    StoreModule.forFeature('create-user', createUserReducer),
    StoreModule.forFeature('update-user', updateUserReducer),
    EffectsModule.forRoot([
      AuthorizationEffect,
      UsersEffect,
      CreateUserEffect,
      UpdateUserEffect,
    ]),
    AppRoutingModule,
    AlertModule,
    FormsModule,
    ReactiveFormsModule,
    SafePipeModule,
  ],
  providers: [ErrorHandler],
  bootstrap: [AppComponent],
})
export class AppModule {}
