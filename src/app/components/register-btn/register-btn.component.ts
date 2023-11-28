import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-register-btn',
  templateUrl: './register-btn.component.html',
  styleUrls: ['./register-btn.component.scss']
})
export class RegisterBtnComponent implements OnInit {
  @Input() registerLink!: string
  @Input() text: string = "Cadastrar novo"
  @Input() hasPermission: boolean = true
  @Output() clickEvent = new EventEmitter<boolean>()
  router = inject(Router)
  authService = inject(LoginService)
  constructor(){}
  ngOnInit(): void {
    this.hasPermission = this.authService.hasPermission("ADMINISTRADOR")
  }

  register(){
    if(!this.registerLink){
      this.clickEvent.emit(true)
    }else{
      this.router.navigate([`${this.registerLink}`])
    }
  }
}
