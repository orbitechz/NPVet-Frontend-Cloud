import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import { Role } from 'src/app/models/enums/role';
import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-usuario-details',
  templateUrl: './usuario-details.component.html',
  styleUrls: ['./usuario-details.component.scss'],
  providers: [provideNgxMask()],
})
export class UsuarioDetailsComponent implements OnInit {
  roleEnum = Role;
  selectedperfil = '';
  confirmarSenha = '';
  usuario = new Usuario();

  hide = true;
  hide2 = true;

  @Input() isErro = true;
  @Input() mensagem = '';

  constructor(private uService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.usuario.role = Role.SECRETARIA;
  }

  passwordsMatch() {
    return this.usuario.senha === this.confirmarSenha;
  }

  submitForm(form: NgForm): void {
    if (form.valid) {
      if (this.passwordsMatch()) {
        this.uService.create(this.usuario).subscribe({
          next: (u) => {
            this.usuario = u;
            this.router.navigate(['web/usuarios']);
          },
          error: (err) => {
            this.mensagem = err.error;
            console.log(err);
            this.isErro = true;
          },
        });
      } else {
        this.mensagem = 'As senhas não coincidem.';
        this.isErro = true;
      }
    } else {
      this.mensagem = 'Preencha todos os campos corretamente.';
      this.isErro = true;
    }
  }
}
