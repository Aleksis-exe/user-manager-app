import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { StoreModule } from '@ngrx/store'
import { MainLayoutComponent } from './layouts/main-layout/components/main-layout/main-layout.component'
import { UsersPageComponent } from './pages/users-page/components/users-page/users-page.component'
import { AppRoutingModule } from './app-routing.module'
import { HeaderComponent } from './layouts/main-layout/components/header/header.component'
import { AlertModule } from './modules/alert/alert.module'

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    UsersPageComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}, {}),
    AppRoutingModule,
    AlertModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
