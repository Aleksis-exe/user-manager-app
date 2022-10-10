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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainLayoutComponent,
    CentrLayoutComponent,
    UsersPageComponent,
    AccessDeniedPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('authorization', authorizationReducer),
    EffectsModule.forRoot([AuthorizationEffect]),
    AppRoutingModule,
    AlertModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
