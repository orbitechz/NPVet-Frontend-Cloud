import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenuComponent } from './core/menu/menu.component';
import { LoginComponent } from './core/login/login.component';
import { ErrorsComponent } from './core/errors/errors.component';
import { ListComponent } from './views/usuario/list/list.component';
import { DetailsComponent } from './views/usuario/details/details.component';
import { TutorListComponent } from './views/tutor/tutor-list/tutor-list.component';
import { TutorDetailsComponent } from './views/tutor/tutor-details/tutor-details.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MenuComponent,
    LoginComponent,
    ErrorsComponent,
    ListComponent,
    DetailsComponent,
    TutorListComponent,
    TutorDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
