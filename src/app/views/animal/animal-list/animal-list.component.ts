import { Component, Input, inject } from '@angular/core';
import { Animal } from 'src/app/models/animal/animal';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Header } from 'src/app/components/table/header';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent {
  @Input() isModal = false  
  isErro!: boolean
  mensagem!: string
  animais: Animal[] = [];
  service = inject(AnimalService);
  data: any[] = [];
  authService = inject(LoginService)
  showEdit = false
  showToggle = false;
  hasPermission = false
  role!: string
  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
    this.showEdit = this.hasPermission = this.authService.hasPermission("SECRETARIA")
    this.showToggle = this.authService.hasPermission("ADMINISTRADOR")
    this.getAll();
  }
  getAll() {
    this.service.getAll().subscribe({
      next: (animais: any) => {
        this.animais = animais;
      },
      error: (erro: any) => {
        this.isErro = true;
        this.mensagem = erro.error
      },
    });
  }

  apiUrlPath(){
    return   `${environment.apiUrl}/animal`;  
  }
  callHeaders(){
    let tableHeaders : Header[] = [];
    tableHeaders.push(new Header('Nome', 'nome'));
    tableHeaders.push(new Header('Tutor', 'tutorId.nome'));
    tableHeaders.push(new Header('Raça', 'raca'));
    tableHeaders.push(new Header('Espécie', 'especie'));
    tableHeaders.push(new Header('Sexo', 'sexo'));
    tableHeaders.push(new Header('Data de Criação','createdAt'));    
    return tableHeaders;
  }
}