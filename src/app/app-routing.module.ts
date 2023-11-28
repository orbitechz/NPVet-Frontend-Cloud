import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorListComponent } from './views/tutor/tutor-list/tutor-list.component';
import { TutorDetailsComponent } from './views/tutor/tutor-details/tutor-details.component';
import { UsuarioListarComponent } from './views/usuario/usuario-listar/usuario-listar.component';
import { UsuarioDetailsComponent } from './views/usuario/usuario-details/usuario-details.component';
import { UsuarioEditComponent } from './views/usuario/usuario-edit/usuario-edit.component';
import { AnimalListComponent } from './views/animal/animal-list/animal-list.component';
import { AnimalDetailsComponent } from './views/animal/animal-details/animal-details.component';
import { ConsultaListComponent } from './views/consulta/consulta-list/consulta-list.component';
import { IndexComponent } from './core/index/index.component';
import { ConsultaAnamneseDetailsComponent } from './views/anamnese/consulta-anamnese-details/consulta-anamnese-details.component';
import { ExameDetailsComponent } from './views/exame-fisico/exame-details/exame-details.component';
import { ExameEditComponent } from './views/exame-fisico/exame-edit/exame-edit/exame-edit.component';
import { AnamneseEditComponent } from './views/anamnese/anamnese-edit/anamnese-edit.component';
import { MenuPrincipalComponent } from './views/menu-principal/menu-principal.component';
import { AnimalEditComponent } from './views/animal/animal-edit/animal-edit/animal-edit.component';
import { LoginComponent } from './core/login/login.component';
import { routesGuard } from './guards/routes.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [routesGuard] },
  {
    path: 'web',
    component: IndexComponent,
    canActivate: [routesGuard],
    children: [
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
      { path: 'menu', component: MenuPrincipalComponent },
      { path: 'tutores', component: TutorListComponent },
      { path: 'tutor/register', component: TutorDetailsComponent },
      { path: 'tutor/edit/:id', component: TutorDetailsComponent },
      { path: 'tutor/:id', component: TutorDetailsComponent },
      { path: 'usuarios', component: UsuarioListarComponent },
      { path: 'usuario/register', component: UsuarioDetailsComponent },
      { path: 'usuario/edit/:id', component: UsuarioEditComponent },
      { path: 'animais', component: AnimalListComponent },
      { path: 'animal/register', component: AnimalDetailsComponent },
      { path: 'animal/edit/:id', component: AnimalEditComponent },
      { path: 'animal/:id', component: AnimalDetailsComponent },
      { path: 'consultas', component: ConsultaListComponent },
      { path: 'consulta/exame/register', component: ExameDetailsComponent },
      { path: 'consulta/exame/edit/:id', component: ExameEditComponent },
      {
        path: 'anamnese/register/:id',
        component: ConsultaAnamneseDetailsComponent,
      },
      { path: 'anamnese/edit/:id', component: AnamneseEditComponent },
      { path: 'exame/register/:id', component: ExameDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
