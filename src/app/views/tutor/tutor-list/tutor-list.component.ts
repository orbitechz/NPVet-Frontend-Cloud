import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from 'src/app/components/table/header';
import { Tutor } from 'src/app/models/tutor/tutor';
import { LoginService } from 'src/app/services/login/login.service';
import { TutorService } from 'src/app/services/tutor/tutor.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.scss'],
})
export class TutorListComponent {
  @Input() isModal = false  
  isErro!: boolean
  mensagem!: string
  title = 'Tutores';
  tutores: Tutor[] = [];
  service = inject(TutorService);
  router = inject(Router)
  data: any[] = [];

  authService = inject(LoginService)
  showEdit = false
  showToggle = false;
  hasPermission = false
  role!: string
  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.role = data['role'];
      }
    });
    this.hasPermission = this.authService.hasPermission("SECRETARIA")
    this.showEdit = this.showToggle = this.hasPermission
    this.getAll();

  }
  getAll() {
    this.service.getAll().subscribe({
      next: (tutores: any) => {
        this.tutores = tutores;
      },
      error: (erro: any) => {
        this.isErro = true;
        this.mensagem = erro.error
      },
    });
  }

  apiUrlPath(){
    return `${environment.apiUrl}/tutor`;  
  }
  callHeaders(){
    let tableHeaders : Header[] = [];
    tableHeaders.push(new Header('Nome', 'nome'));
    tableHeaders.push(new Header('CPF', 'cpf'));
    tableHeaders.push(new Header('Data de Criação','createdAt'));    
    return tableHeaders;
  }

  register(){
    this.router.navigate(['tutor/register'])
  }
}
