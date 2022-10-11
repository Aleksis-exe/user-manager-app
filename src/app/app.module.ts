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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('authorization', authorizationReducer),
    StoreModule.forFeature('users', usersReducer),
    StoreModule.forFeature('create-user', createUserReducer),
    EffectsModule.forRoot([AuthorizationEffect, UsersEffect, CreateUserEffect]),
    AppRoutingModule,
    AlertModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
