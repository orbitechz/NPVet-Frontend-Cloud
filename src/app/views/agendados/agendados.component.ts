import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Header } from 'src/app/components/table/header';
import { Consulta } from 'src/app/models/consulta/consulta';
import { ConsultaService } from 'src/app/services/consulta/consulta.service';
import { LoginService } from 'src/app/services/login/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-agendados',
  templateUrl: './agendados.component.html',
  styleUrls: ['./agendados.component.scss'],
})
export class AgendadosComponent {
  @Input() isModal = false;
  isErro!: boolean;
  mensagem!: string;
  consultas: Consulta[] = [];
  service = inject(ConsultaService);
  modalService = inject(NgbModal);
  data: any[] = [];
  consultaSelecionada!: Consulta;
  modalRef!: NgbModalRef;
  baseUrl!: string
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.baseUrl = `${environment.apiUrl}/consulta`;
    this.apiUrlPath();
  }
  apiUrlPath() {
    let start = this.formatarHorarioStart(new Date().toISOString());
    let end = this.formatarHorarioEnd(new Date().toISOString());
    let url = `${this.baseUrl}/report?startDate=${start}&endDate=${end}`;
    return url
  }
  formatarHorarioStart(horario: string): string {
    const data = new Date(horario);
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');  
    return `${ano}-${mes}-${dia}T00:00`;
  }
  formatarHorarioEnd(horario: string): string {
    const data = new Date(horario);
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');  
    return `${ano}-${mes}-${dia}T23:59`;
  }

  callHeaders() {
    let tableHeaders: Header[] = [];
    tableHeaders.push(new Header('Animal', 'animal.nome'));
    tableHeaders.push(new Header('Tutor', 'tutor.nome'));
    tableHeaders.push(new Header('Email', 'tutor.email'));
    tableHeaders.push(new Header('Telefone', 'tutor.telefone'));
    tableHeaders.push(new Header('Veterinario', 'veterinario.nome'));
    tableHeaders.push(new Header('Data de Consulta', 'data'));
    return tableHeaders;
  }
  modal(template: any, consulta?: Consulta) {
    if (consulta) {
      console.log(consulta);
      this.consultaSelecionada = consulta;
    }
    this.modalService.open(template, {
      size: 'lg',
      windowClass: 'marcar-consulta',
    });
  }
  abrirModal(template: any) {
    this.modalRef = this.modalService.open(template, {
      size: 'lg',
      centered: true,
    });
  }
}
