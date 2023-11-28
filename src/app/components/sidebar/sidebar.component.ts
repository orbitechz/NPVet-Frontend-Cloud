import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  modalService = inject(NgbModal);
  router = inject(Router);
  constructor(){}

  logoutModal(template: any){
    this.modalService.open(template)
  }
  logout(){
    this.router.navigate(['/logout'])
  }
}
