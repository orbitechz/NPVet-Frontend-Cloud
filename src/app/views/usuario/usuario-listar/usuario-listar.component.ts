import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  showEdit = false
  showToggle = false;
  isErro!: boolean;
  mensagem!: string;
  authService = inject(LoginService)
  hasPermission = false
  role!: string
  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.role = data['role'];
      }
    });
    this.hasPermission = this.authService.hasPermission("ADMINISTRADOR")
    this.showEdit = this.showToggle = this.hasPermission
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
