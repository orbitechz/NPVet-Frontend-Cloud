import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenuComponent } from './core/menu/menu.component';
import { ErrorsComponent } from './core/errors/errors.component';
import { TutorListComponent } from './views/tutor/tutor-list/tutor-list.component';
import { TutorDetailsComponent } from './views/tutor/tutor-details/tutor-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MensagemComponent } from './components/mensagem/mensagem.component';
import { IconsModule } from './modules/icons.module';
import { TableComponent } from './components/table/table.component';
import { UsuarioService } from './services/usuario/usuario.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { UsuarioListarComponent } from './views/usuario/usuario-listar/usuario-listar.component';
import { UsuarioDetailsComponent } from './views/usuario/usuario-details/usuario-details.component';
import { UsuarioEditComponent } from './views/usuario/usuario-edit/usuario-edit.component';
import { AnimalListComponent } from './views/animal/animal-list/animal-list.component';
import { AnimalDetailsComponent } from './views/animal/animal-details/animal-details.component';
import { ConsultaListComponent } from './views/consulta/consulta-list/consulta-list.component';
import { ConsultaDetailsComponent } from './views/consulta/consulta-details/consulta-details.component';
import { RegisterBtnComponent } from './components/register-btn/register-btn.component';
import { IndexComponent } from './core/index/index.component';
import { ExameListComponent } from './views/exame-fisico/exame-list/exame-list.component';
import { ExameDetailsComponent } from './views/exame-fisico/exame-details/exame-details.component';
import { MatOption } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';
import { ExameEditComponent } from './views/exame-fisico/exame-edit/exame-edit/exame-edit.component';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatSelectFilter }

// import { MatSelec};
import { ConsultaAnamneseDetailsComponent } from './views/anamnese/consulta-anamnese-details/consulta-anamnese-details.component';
import { AnamneseEditComponent } from './views/anamnese/anamnese-edit/anamnese-edit.component';
import { MenuPrincipalComponent } from './views/menu-principal/menu-principal.component';
import { AnimalEditComponent } from './views/animal/animal-edit/animal-edit/animal-edit.component';
import { RelatorioComponent } from './components/relatorio/relatorio.component';
import { HttpInterceptorService, httpInterceptorProviders } from './interceptors/http-interceptor.service';
import { LoginComponent } from './core/login/login.component';
import { VacinaDetailsComponent } from './views/vacina/vacina-details/vacina-details.component';
import { AgendadosComponent } from './views/agendados/agendados.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MenuComponent,
    LoginComponent,
    ErrorsComponent,
    TutorListComponent,
    TutorDetailsComponent,
    MensagemComponent,
    TableComponent,
    SearchBarComponent,
    HeaderComponent,
    UsuarioListarComponent,
    UsuarioDetailsComponent,
    UsuarioEditComponent,
    AnimalListComponent,
    AnimalDetailsComponent,
    ConsultaListComponent,
    ConsultaDetailsComponent,
    RegisterBtnComponent,
    IndexComponent,
    ExameListComponent,
    ExameDetailsComponent,
    ConsultaAnamneseDetailsComponent,
    ExameEditComponent,
    ConsultaAnamneseDetailsComponent,
    AnamneseEditComponent,
    MenuPrincipalComponent,
    AnimalEditComponent,
    VacinaDetailsComponent,
    RelatorioComponent,
    AgendadosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IconsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
    NgxViacepModule,
    MatTooltipModule,
    // MatSelectFilterModule
  ],
  providers: [UsuarioService, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
