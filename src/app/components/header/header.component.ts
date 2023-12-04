import { Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Consulta } from 'src/app/models/consulta/consulta';
import { ConsultaService } from 'src/app/services/consulta/consulta.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent{
  title: string = '';
  routerLink!: string;
  router = inject(Router);
  consultaService = inject(ConsultaService)
  consultasAgendadas! :Consulta[]
  notifs!: number
  url!: string;
  constructor(private location: Location) {
    let start = this.formatarHorarioStart(new Date().toISOString());
    let end = this.formatarHorarioEnd(new Date().toISOString());
    console.log(this.notifs)
    this.consultaService.getFilteredConsultas(start, end).subscribe({
      next: (consultas) => {
        this.consultasAgendadas = consultas
        this.notifs = this.consultasAgendadas.length
      },
      error: (error) => {
        console.log(error)
      },

    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.url = event.url.split('/')[2] 
        if (this.url == undefined) {
          this.title = 'npvet';
        } else {
          this.title = this.url.slice(0, 1).toUpperCase() + this.url.slice(1);
        }
      });
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
  back() {
    this.location.back();
  }
}
