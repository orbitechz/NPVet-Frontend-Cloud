import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Consulta } from 'src/app/models/consulta/consulta';
import { ConsultaService } from 'src/app/services/consulta/consulta.service';
import { Header } from '../table/header';
import { Usuario } from 'src/app/models/usuario/usuario';
import { environment } from 'src/environments/environment';
import { Animal } from 'src/app/models/animal/animal';
import { Status } from 'src/app/models/enums/status';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent {
  modalRef!: NgbModalRef;
  modalService = inject(NgbModal);
  @Output() confirmarEvent = new EventEmitter<Consulta>();
  @Input() consultaSelecionada!: Consulta;
  keys = Object.keys;
  statuses = Object.values(Status);
  isErro = false;
  mensagem!: string;
  disabled = false;
  consulta = new Consulta();
  service = inject(ConsultaService);
  router = inject(Router);
  showButton = false;
  radio1: boolean = false;
  radio2: boolean = false;
  isDropdownOpen = false;
  selectedStartDate: string = '';
  selectedEndDate: string = '';
  selectedStatus: Status = Status.CONCLUIDA;
  selectedIncluirType: string = 'AnamnesesExames';
  allStatusSelected: boolean = true;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onStartDateChange(event: any) {
    this.selectedStartDate = event.target.value;
  }

  onEndDateChange(event: any) {
    this.selectedEndDate = event.target.value;
  }

  onStatusChange(status: string) {
    this.selectedStatus = status as Status;
  }

  onIncluirTypeChange(type: string) {
    this.selectedIncluirType = type;
  }

  onAllStatusChange() {
    this.allStatusSelected = !this.allStatusSelected;
    this.selectedStatus = this.allStatusSelected ? Status.CONCLUIDA : null as any;
  }

  imprimirRelatorios() {
    if (this.allStatusSelected) {
      this.service.getFilteredConsultas(
        this.selectedStartDate,
        this.selectedEndDate
      ).subscribe({
        next: (consultas) => {
           const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
           pdfMake.createPdf(documentDefinition).open();
        },
        error: (error) => console.log(error)
      });
    } else {
      const idArgument = this.consulta.animal.id ?? undefined;
      this.service.getFilteredConsultas(
        this.selectedStartDate,
        this.selectedEndDate,
        idArgument,
        this.selectedStatus
      ).subscribe({
        next: (consultas) => {
            const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
            pdfMake.createPdf(documentDefinition).open();
        },
        error: (error) => console.log(error)
      });
    }
  }

  onRadioChange() {
    this.showButton = true;
  }

  onRadioChangeOther() {
    this.showButton = false;
    this.consulta.animal = new Animal();
  }

  ngOnInit(): void {
    if (this.consultaSelecionada) {
      this.consulta = this.consultaSelecionada;
      this.disabled = true;
    } else {
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
    this.consulta.tutor = this.consulta.animal.tutorId;
    this.service.create(this.consulta).subscribe({
      next: (consulta) => {
        this.isErro = false;
        this.mensagem = 'Consulta criada com sucesso!';
        this.confirmarEvent.emit(consulta);
      },
      error: (error) => {
        this.isErro = true;
        this.mensagem = error.error;
      },
    });
  }

  getAnimalUrl() {
    return `${environment.apiUrl}/animal`;
  }
}
