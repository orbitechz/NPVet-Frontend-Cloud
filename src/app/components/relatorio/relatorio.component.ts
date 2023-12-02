// Import necessary Angular and third-party modules
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

// Import relevant models and services
import { Consulta } from 'src/app/models/consulta/consulta';
import { ConsultaService } from 'src/app/services/consulta/consulta.service';
import { Header } from '../table/header';
import { Usuario } from 'src/app/models/usuario/usuario';
import { environment } from 'src/environments/environment';
import { Animal } from 'src/app/models/animal/animal';
import { Status } from 'src/app/models/enums/status';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent {
  // Declare class properties
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
  selectedStatuses: Status[] = [];
  selectedIncluirType: string = 'AnamnesesExames';
  allStatusSelected: boolean = true;

  // Toggle the dropdown menu
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Handle the change in the start date
  onStartDateChange(event: any) {
    this.selectedStartDate = event.target.value;
  }

  // Handle the change in the end date
  onEndDateChange(event: any) {
    this.selectedEndDate = event.target.value;
  }

  // Handle the change in the consultation status
  onStatusChange(status: string) {
    if (status === 'allStatus') {
      this.allStatusSelected = !this.allStatusSelected;

      if (this.allStatusSelected) {
        this.selectedStatuses = [];
      }
    } else {
      const index = this.selectedStatuses.indexOf(status as Status);

      if (index === -1) {
        this.selectedStatuses.push(status as Status);
      } else {
        this.selectedStatuses.splice(index, 1);
      }

      this.allStatusSelected = false;
    }
  }

  // Handle the change in the "Incluir Anamneses e Exames" radio buttons
  onIncluirTypeChange(type: string) {
    this.selectedIncluirType = type;
  }

  // Log selected values when "Imprimir Relatorio" button is clicked
  imprimirRelatorios() {
    this.service.getFilteredConsultas(this.selectedStartDate,
      this.selectedEndDate,
      this.consulta.animal.id).subscribe({
        next: (consultas) => {
          console.log(consultas);
        },
        error: (error) => {
          console.log(error);
        }
      });

  }

  // Handle the change in the radio button for "Imprimir Relatório de Consultas por Paciente"
  onRadioChange() {
    this.showButton = true;
  }

  // Handle the change in the radio button for "Imprimir Todas as Consultas neste Período"
  onRadioChangeOther() {
    this.showButton = false;
    this.consulta.animal = new Animal();
  }

  // Component initialization logic
  ngOnInit(): void {
    if (this.consultaSelecionada) {
      this.consulta = this.consultaSelecionada;
      this.disabled = true;
    } else {
      this.consulta.animal = new Animal();
      this.consulta.veterinario = new Usuario();
    }
  }

  // Open the modal for selecting animals or veterinarians
  abrirModal(template: any) {
    this.modalRef = this.modalService.open(template, {
      size: 'lg',
      centered: true,
    });
  }

  // Set the selected animal and close the modal
  definirAnimal(animal: Animal) {
    this.consulta.animal = animal;
    this.modalRef.close();
  }

  // Set the selected veterinarian and close the modal
  definirVeterinario(veterinario: Usuario) {
    this.consulta.veterinario = veterinario;
    this.modalRef.close();
  }

  // Define table headers for animals
  callAnimalHeaders() {
    let tableHeaders: Header[] = [];
    tableHeaders.push(new Header('Nome', 'nome'));
    tableHeaders.push(new Header('Tutor', 'tutorId.nome'));
    tableHeaders.push(new Header('Raça', 'raca'));
    tableHeaders.push(new Header('Espécie', 'especie'));
    tableHeaders.push(new Header('Sexo', 'sexo'));
    return tableHeaders;
  }

  // Define table headers for veterinarians
  callVeterinarioHeaders() {
    let tableHeaders: Header[] = [];
    tableHeaders.push(new Header('Nome', 'nome'));
    tableHeaders.push(new Header('Usuário', 'username'));
    tableHeaders.push(new Header('CPF', 'cpf'));
    return tableHeaders;
  }

  // Perform actions when the "Confirmar" button is clicked
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

  // Return the API URL for animals
  getAnimalUrl() {
    return `${environment.apiUrl}/animal`;
  }

}
