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
export class HeaderComponent implements OnInit{
  title: string = '';
  routerLink!: string;
  router = inject(Router);
  consultaService = inject(ConsultaService)
  consultasAgendadas! :Consulta[]
  hoje!: string
  notifs!: number
  url!: string;
  constructor(private location: Location) {
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
  ngOnInit(): void {
    this.hoje = new Date().toISOString()
    console.log(this.hoje)
    this.consultaService.getFilteredConsultas(this.hoje, this.hoje).subscribe({
      next: (consultas) => {
        this.consultasAgendadas = consultas
        this.notifs = this.consultasAgendadas.length
      },
      error: (error) => {
        console.log(error)
      },

    });
  }
  back() {
    this.location.back();
  }
}
