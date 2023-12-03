import { Component, Input, inject } from '@angular/core';

import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Header } from 'src/app/components/table/header';
import { Consulta } from 'src/app/models/consulta/consulta';
import { ConsultaService } from 'src/app/services/consulta/consulta.service';
import { LoginService } from 'src/app/services/login/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consulta-list',
  templateUrl: './consulta-list.component.html',
  styleUrls: ['./consulta-list.component.scss']
})
export class ConsultaListComponent {
  @Input() isModal = false  
  isErro!: boolean
  mensagem!: string
  consultas: Consulta[] = [];
  service = inject(ConsultaService);
  modalService = inject(NgbModal)
  data: any[] = [];
  consultaSelecionada!: Consulta
  modalRef!: NgbModalRef;


  authService = inject(LoginService)
  showEdit = false
  showToggle = false;
  hasPermission = false
  constructor(){}
  ngOnInit(): void {
    this.showEdit = this.hasPermission = this.authService.hasPermission("SECRETARIA")
    this.showToggle = this.authService.hasPermission("ADMINISTRADOR")
    this.getAll();
  }
  getAll() {
    this.service.getAll().subscribe({
      next: (consultas: any) => {
        this.consultas = consultas;
      },
      error: (erro: any) => {
        this.isErro = true;
        this.mensagem = erro.error
      },
    });
  }

  apiUrlPath(){
    return `${environment.apiUrl}/consulta`;  
  }
  callHeaders(){
    let tableHeaders : Header[] = [];
    tableHeaders.push(new Header('Animal', 'animal.nome'));
    tableHeaders.push(new Header('Tutor', 'tutor.nome'));
    tableHeaders.push(new Header('CPF', 'tutor.cpf'));
    tableHeaders.push(new Header('Veterinario', 'veterinario.nome'));
    tableHeaders.push(new Header('Data de Consulta','data'));    
    return tableHeaders; 
  }
  modal(template: any, consulta?: Consulta){
    if(consulta){
      console.log(consulta)
      this.consultaSelecionada = consulta
    }
    this.modalService.open(template, {size: "lg", windowClass:"marcar-consulta"})
  }
  confirmar(consulta: Consulta){
    if(consulta.id){
      this.modalService.dismissAll()
      this.isErro = false
      this.mensagem ="Consulta criada com sucesso!"
    }
  }
  abrirModal(template: any) {
    this.modalRef = this.modalService.open(template, {
      size: 'lg',
      centered: true,
    });
  }

}

