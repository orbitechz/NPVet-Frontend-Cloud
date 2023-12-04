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
import { routesGuard } from './guards/routes.guard';
import { LoginComponent } from './core/login/login.component';
import { Role } from './models/enums/role';
import { ErrorsComponent } from './core/errors/errors.component';
import { AgendadosComponent } from './views/agendados/agendados.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [routesGuard] },
  { path: 'logout', component: LoginComponent, canActivate: [routesGuard] },
  {
    path: 'web',
    component: IndexComponent,
    canActivate: [routesGuard],
    data: { role: '*' },
    children: [
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
      {
        path: 'erro',
        component: ErrorsComponent,
        canActivate: [routesGuard],
        data: { role: '*' },
      },
      {
        path: 'agendados',
        component: AgendadosComponent,
        canActivate: [routesGuard],
        data: { role: '*' },
      },
      {
        path: 'menu',
        component: MenuPrincipalComponent,
        canActivate: [routesGuard],
        data: { role: '*' },
      },
      {
        path: 'tutores',
        component: TutorListComponent,
        canActivate: [routesGuard],
        data: { role: '*' },
      },
      {
        path: 'tutor/register',
        component: TutorDetailsComponent,
        canActivate: [routesGuard],
        data: { role: 'SECRETARIA' },
      },
      {
        path: 'tutor/edit/:id',
        component: TutorDetailsComponent,
        canActivate: [routesGuard],
        data: { role: 'SECRETARIA' },
      },
      {
        path: 'tutor/:id',
        component: TutorDetailsComponent,
        canActivate: [routesGuard],
        data: { role: '*' },
      },
      {
        path: 'usuarios',
        component: UsuarioListarComponent,
        canActivate: [routesGuard],
        data: { role: '*' },
      },
      {
        path: 'usuario/register',
        component: UsuarioDetailsComponent,
        canActivate: [routesGuard],
        data: { role: 'ADMINISTRADOR' },
      },
      {
        path: 'usuario/edit/:id',
        component: UsuarioEditComponent,
        canActivate: [routesGuard],
        data: { role: 'ADMINISTRADOR' },
      },
      {
        path: 'animais',
        component: AnimalListComponent,
        canActivate: [routesGuard],
        data: { role: '*' },
      },
      {
        path: 'animal/register',
        component: AnimalDetailsComponent,
        canActivate: [routesGuard],
        data: { role: 'SECRETARIA' },
      },
      {
        path: 'animal/edit/:id',
        component: AnimalEditComponent,
        canActivate: [routesGuard],
        data: { role: '*' },
      },
      {
        path: 'animal/:id',
        component: AnimalDetailsComponent,
        canActivate: [routesGuard],
        data: { role: '*' },
      },
      {
        path: 'consultas',
        component: ConsultaListComponent,
        canActivate: [routesGuard],
        data: { role: '*' },
      },
      {
        path: 'consulta/exame/register',
        component: ExameDetailsComponent,
        canActivate: [routesGuard],
        data: { role: '*' },
      },
      {
        path: 'consulta/exame/edit/:id',
        component: ExameEditComponent,
        canActivate: [routesGuard],
        data: { role: '*' },
      },
      {
        path: 'anamnese/register/:id',
        component: ConsultaAnamneseDetailsComponent,
        canActivate: [routesGuard],
        data: { role: 'MEDICO' },
      },
      {
        path: 'anamnese/edit/:id',
        component: AnamneseEditComponent,
        canActivate: [routesGuard],
        data: { role: 'MEDICO' },
      },
      {
        path: 'exame/register/:id',
        component: ExameDetailsComponent,
        canActivate: [routesGuard],
        data: { role: 'MEDICO' },
      },
      // DEIXE ESSA ROTA POR ÚLTIMO, É A ROTA DE ERRO
      {
        path: '**',
        redirectTo: 'erro',
        pathMatch: 'full',
      },
    ],
  },
  // DEIXE ESSA ROTA POR ÚLTIMO, É A ROTA DE ERRO
  {
    path: '**',
    redirectTo: '/web/erro',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
