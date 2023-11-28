import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsbFill } from 'ng-bootstrap-icons/icons';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-register-btn',
  templateUrl: './register-btn.component.html',
  styleUrls: ['./register-btn.component.scss']
})
export class RegisterBtnComponent {
  @Input() registerLink!: string
  @Input() text: string = "Cadastrar novo"
  @Input() isBlocked: boolean = false
  @Output() clickEvent = new EventEmitter<boolean>()
  router = inject(Router)
  authService = inject(LoginService)
  constructor(){}


  register(){
    if(!this.isBlocked){
      if(!this.registerLink){
        this.clickEvent.emit(true)
      }else{
        this.router.navigate([`${this.registerLink}`])
      }
    }
  }
}
