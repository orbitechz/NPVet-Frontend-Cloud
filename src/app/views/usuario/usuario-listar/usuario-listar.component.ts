import { Component, OnInit, inject } from '@angular/core';
import { Header } from 'src/app/components/table/header';
import { LoginService } from 'src/app/services/login/login.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.scss'],
})
export class UsuarioListarComponent implements OnInit {

  isErro!: boolean;
  mensagem!: string;
  hasPermission = false;
  authService = inject(LoginService)
  ngOnInit(): void {
    this.hasPermission = this.authService.hasPermission("ADMINISTRADOR")
  }
  // Table Configuarations
  apiUrlPath() {
    return `${environment.apiUrl}/usuario`;
  }
  callHeaders() {
    let tableHeaders: Header[] = [];
    tableHeaders.push(new Header('Nome', 'nome'));
    tableHeaders.push(new Header('Username', 'username'));
    tableHeaders.push(new Header('CPF', 'cpf'));
    tableHeaders.push(new Header('Tipo Usuario', 'role'));
    return tableHeaders;
  }
}
