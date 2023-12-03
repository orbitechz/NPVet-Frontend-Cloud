import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Header } from 'src/app/components/table/header';
import { Animal } from 'src/app/models/animal/animal';
import { Consulta } from 'src/app/models/consulta/consulta';
import { Status } from 'src/app/models/enums/status';
import { Usuario } from 'src/app/models/usuario/usuario';
import { ConsultaService } from 'src/app/services/consulta/consulta.service';
import { LoginService } from 'src/app/services/login/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consulta-details',
  templateUrl: './consulta-details.component.html',
  styleUrls: ['./consulta-details.component.scss'],
})
export class ConsultaDetailsComponent implements OnInit {
  @Output() confirmarEvent = new EventEmitter<Consulta>();
  @Input() consultaSelecionada!: Consulta
  keys = Object.keys;
  statuses = Status;
  isErro = false;
  mensagem!: string;
  disabled = false;
  consulta = new Consulta();
  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;
  service = inject(ConsultaService);
  router = inject(Router)
  authService = inject(LoginService)
  hasPermission = false
  constructor() {
  }
  ngOnInit(): void {
    if(this.consultaSelecionada){
      this.hasPermission = this.authService.hasPermission("MEDICO")
      this.consulta = this.consultaSelecionada
      // this.disabled = true
    }else{
      this.consulta.animal = new Animal();
      this.consulta.veterinario = new Usuario();
    }
  }
  abrirModal(template: any) {
    this.modalRef = this.modalService.open(template, {
      size: 'lg',
      centered: true,
    });
  }

  definirAnimal(animal: Animal) {
    this.consulta.animal = animal;
    this.modalRef.close();
  }
  definirVeterinario(veterinario: Usuario) {
    this.consulta.veterinario = veterinario;
    this.modalRef.close();
  }
  callAnimalHeaders() {
    let tableHeaders: Header[] = [];
    tableHeaders.push(new Header('Nome', 'nome'));
    tableHeaders.push(new Header('Tutor', 'tutorId.nome'));
    tableHeaders.push(new Header('Raça', 'raca'));
    tableHeaders.push(new Header('Espécie', 'especie'));
    tableHeaders.push(new Header('Sexo', 'sexo'));
    return tableHeaders;
  }
  callVeterinarioHeaders() {
    let tableHeaders: Header[] = [];
    tableHeaders.push(new Header('Nome', 'nome'));
    tableHeaders.push(new Header('Usuário', 'username'));
    tableHeaders.push(new Header('CPF', 'cpf'));
    return tableHeaders;
  }
  confirmar() {
    this.consulta.tutor = this.consulta.animal.tutorId
    this.service.create(this.consulta).subscribe({
      next: (consulta) => {
        this.isErro = false;
        this.mensagem = 'Consulta criada com sucesso!';
        this.confirmarEvent.emit(consulta)
      },
      error: (error) => {
        this.isErro = true;
        this.mensagem = error.error;
      },

    });
  }
  btnAcao() {
    return 'Confirmar';
  }


  anamnese() {
   

  anamnese(){
    if(this.hasPermission){
      this.modalService.dismissAll();
  
    if (this.consulta.anamnese && this.consulta.anamnese.id) {
      this.router.navigate(['/web/anamnese/edit', this.consulta.anamnese.id]);
    } else {
      this.router.navigate(['/web/anamnese/register', this.consulta.id]);
    
    }

    }
  }
  

  exameFisico(){
    if(this.hasPermission){
      this.modalService.dismissAll()
      this.router.navigate(['/web/exame/register', this.consulta.id])
    }
  }
  getAnimalUrl(){
    return `${environment.apiUrl}/animal`
  }
  getUsuarioUrlEspecifica(){
    return `${environment.apiUrl}/usuario/veterinarios`
  }
}
