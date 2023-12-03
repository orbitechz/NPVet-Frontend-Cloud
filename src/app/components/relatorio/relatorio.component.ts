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
import { Anamnese } from 'src/app/models/anamnese/anamnese';
import { Tutor } from 'src/app/models/tutor/tutor';
import { TDocumentDefinitions, Style } from 'pdfmake/interfaces';
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
    const idArgument = this.consulta.animal.id;
  
    if (this.allStatusSelected) {
      this.service.getFilteredConsultas(
        this.selectedStartDate,
        this.selectedEndDate,
        idArgument  // Include idArgument in both cases
      ).subscribe({
        next: (consultas) => {
          console.log(consultas);
          this.generatePDF(consultas, this.selectedStartDate, this.selectedEndDate);
        },
        error: (error) => console.log(error),
      });
    } else {
      this.service.getFilteredConsultas(
        this.selectedStartDate,
        this.selectedEndDate,
        idArgument,  // Include idArgument in both cases
        this.selectedStatus
      ).subscribe({
        next: (consultas) => {
          console.log(consultas);
          this.generatePDF(consultas, this.selectedStartDate, this.selectedEndDate);
        },
        error: (error) => console.log(error)
      });
    }
  }
  

  generatePDF(consultas: Consulta[], selectedStartDate: any, selectedEndDate: any) {
    const startDate = this.ensureDate(selectedStartDate);
    const endDate = this.ensureDate(selectedEndDate);
  
    const documentDefinition: TDocumentDefinitions = {
      header: {
        text: [
          'Data de Criação: ', { text: this.getCurrentDate(), bold: true },
          '\nEmissor: ', { text: `${this.consulta.veterinario.nome}`, bold: true },
          '\nNPVet: ', { text: 'NPVet', bold: true }
        ],
        style: 'headerStyle',
      },
      content: [
        { text: 'Relatórios de Consultas', style: 'titleStyle' },
        {
          text: `Em data de ${this.formatDate(startDate)} até ${this.formatDate(endDate)}`,
          style: 'subtitleStyle'
        },
        ...consultas.map((consulta) => [
          
          { text: `Consulta em ${consulta.data}`, style: 'consultaTitle' },
          { text: '\nDetalhes da Consulta:', style: 'sectionHeader' },
          this.createAnimalSection(consulta.animal),
          this.createTutorSection(consulta.tutor),
          this.createAnamneseSection(consulta.anamnese),
        ]),
      ],
      styles: {
        headerStyle: {
          fontSize: 10,
          alignment: 'right',
          margin: [0, 10, 0, 0],
        },
        titleStyle: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        subtitleStyle: {
          fontSize: 14,
          italics: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        sectionHeader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        consultaTitle: {
          fontSize: 16,
          bold: true,
          alignment: 'left',
          margin: [0, 10, 0, 5],
        },
      },
    };
  
    pdfMake.createPdf(documentDefinition).open();
  }
  

  ensureDate(value: any): Date {
    const date = new Date(value);
    return isNaN(date.getTime()) ? new Date() : date;
  }
  createAnimalSection(animal: Animal): any {
    return {
      text: 'Animal:',
      style: 'sectionHeader',
      margin: [0, 10, 0, 5],
      bold: true,
      canvas: [
        {
          type: 'rect',
          x: 0,
          y: 5,
          w: 515,
          h: 2,
          lineColor: '#000000',
        },
      ],
      table: {
        widths: ['auto', '*'],
        body: [
          ['Nome:', animal.nome],
          ['Espécie:', animal.especie],
          ['Raça:', animal.raca],
          ['Sexo:', animal.sexo],
          ['Idade:', animal.idade],
          ['Peso:', animal.peso],
          ['Pelagem:', animal.pelagem],
          ['Procedência:', animal.procedencia],
        ],
      },
    };
  }

  createTutorSection(tutor: Tutor): any {
    // Check if the tutor object is defined
    if (!tutor) {
      return { text: 'Tutor information not available', margin: [0, 10, 0, 5] };
    }
  
    return {
      text: 'Tutor:',
      style: 'sectionHeader',
      margin: [0, 10, 0, 5],
      bold: true,
      canvas: [
        {
          type: 'rect',
          x: 0,
          y: 5,
          w: 515,
          h: 2,
          lineColor: '#000000',
        },
      ],
      table: {
        widths: ['auto', '*'],
        body: [
          ['Nome:', tutor.nome || 'N/A'],
          ['Gênero:', tutor.genero || 'N/A'],
          ['CPF:', tutor.cpf || 'N/A'],
          ['RG:', tutor.rg || 'N/A'],
          ['Email:', tutor.email || 'N/A'],
          ['Telefones:', (tutor.telefones && tutor.telefones.length > 0) ? tutor.telefones.map(contact => contact.telefone).join(', ') : 'N/A'],
          ['Endereços:', (tutor.enderecos && tutor.enderecos.length > 0) ? tutor.enderecos.map(address => address.logradouro).join(', ') : 'N/A'],
        ],
      },
    };
  }
  

  createAnamneseSection(anamnese: Anamnese): any {
    // Check if the anamnese object is defined
    if (!anamnese) {
      return { text: 'Anamnese information not available', margin: [0, 10, 0, 5] };
    }
  
    return {
      text: 'Anamnese:',
      style: 'sectionHeader',
      margin: [0, 10, 0, 5],
      bold: true,
      canvas: [
        {
          type: 'rect',
          x: 0,
          y: 5,
          w: 515,
          h: 2,
          lineColor: '#000000',
        },
      ],
      table: {
        widths: ['auto', '*'],
        body: [
          ['Queixa Principal:', anamnese.queixaPrincipal || 'N/A'],
          ['Alimentação:', anamnese.alimentacao || 'N/A'],
          ['Contatantes:', anamnese.contactantes || 'N/A'],
          ['Ambiente:', anamnese.ambiente || 'N/A'],
          ['Vacinacao:', anamnese.vacinacao || 'N/A'],
          ['Vermifugação:', anamnese.vermifugacao || 'N/A'],
          ['Sistema Respiratório:', anamnese.sistemaRespiratorio || 'N/A'],
          ['Sistema Cardiovascular:', anamnese.sistemaCardiovascular || 'N/A'],
          ['Sistema Urinário:', anamnese.sistemaUrinario || 'N/A'],
          ['Sistema Reprodutor:', anamnese.sistemaReprodutor || 'N/A'],
          ['Sistema Locomotor:', anamnese.sistemaLocomotor || 'N/A'],
          ['Sistema Neurologico:', anamnese.sistemaNeurologico || 'N/A'],
          ['Sistema Digestório:', anamnese.sistemaDigestorio || 'N/A'],
          ['Pele:', anamnese.pele || 'N/A'],
          ['Olhos:', anamnese.olhos || 'N/A'],
          ['Ouvidos:', anamnese.ouvidos || 'N/A'],
        ],
      },
    };
  }

  

  formatDate(dataInicio: any) {
    return dataInicio.toLocaleDateString();
  }
  getCurrentDate() {
    const today = new Date();
    return today.toLocaleDateString();
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
