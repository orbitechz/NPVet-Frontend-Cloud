import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Header } from 'src/app/components/table/header';
import { Animal } from 'src/app/models/animal/animal';
import { Sexo } from 'src/app/models/enums/sexo';
import { Tutor } from 'src/app/models/tutor/tutor';
import { Vacina } from 'src/app/models/vacina/vacina';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { LoginService } from 'src/app/services/login/login.service';
import { VacinaService } from 'src/app/services/vacina/vacina.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class AnimalDetailsComponent implements OnInit {
  animal: Animal = new Animal();
  vacina : Vacina = new Vacina();
  @Output() retorno = new EventEmitter<Animal>();

  service = inject(AnimalService);
  isErro : boolean = false;
  mensagem! : string;
  keys = Object.keys;
  sexos = Sexo;
  disabled = false;
  router = inject(Router);
  id!: string;
  url!: string;
  detailsMode = false;
  showToggle = false;
  showEdit = false;
  authService = inject(LoginService)
  vacinaService = inject(VacinaService)
  hasPermission = false
  vacinaSelecionada! : Vacina;
  constructor(
    private route: ActivatedRoute,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    this.url = this.router.url;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.showEdit = this.hasPermission = this.authService.hasPermission("ADMINISTRADOR, MEDICO")
    this.showToggle = this.authService.hasPermission("ADMINISTRADOR, MEDICO")

  if(Number(this.id)){
    this.getById(Number(this.id));
    this.disabled = true;
    this.detailsMode = true;
    console.log("está desabilitado.");
    console.log(this.detailsMode);
  }
  
  }

  salvar() {

    console.log(this.animal)
    this.service.save(this.animal).subscribe({
      next: animais => {
        this.animal = animais;
        this.mensagem = "Animal cadastrado com sucesso!";
        this.moveTo();
        this.router.navigate(["/web/animais"]);
      },
      error: (erro) => {
        console.log(erro.error);
        this.isErro = true;
        this.moveTo();
        this.mensagem = (erro.error);
      }
    })
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  openEditar(vacina: Vacina, content:any){
    this.vacinaSelecionada = vacina;
    this.modalService.open(content, { size: 'lg' });
  }

  callHeadersTutor(){
    let tableHeaders : Header[] = [];
    tableHeaders.push(new Header('Nome', 'nome'));
    tableHeaders.push(new Header('CPF', 'cpf'));
    tableHeaders.push(new Header('Data de Criação','createdAt'));    
    return tableHeaders;
  }
  callHeadersVacina(){
    let tableHeaders : Header[] = [];
    tableHeaders.push(new Header('Nome', 'nome'));
    tableHeaders.push(new Header('Data de aplicação', 'dataAplicacao'));
    tableHeaders.push(new Header('Data de retorno','dataRetorno'));
    tableHeaders.push(new Header('Descrição','descricao'));    
    
    return tableHeaders;
  }
  getUrlVacinas(){
    if(Number(this.id)){
      return `${environment.apiUrl}/vacina/${Number(this.id)}`
    }else{
      return 'null'
    }
  }

  selecionarTutor(tutor: Tutor){
    this.animal.tutorId = tutor
    this.modalService.dismissAll()
  }

  moveTo() {
    window.scrollTo(0, 0);
  }

  sair(){
    window.scrollTo(0, 0);
    this.router.navigate(["/web/animais"]);
  }

  getById(id: number) {
    this.service.getById(id).subscribe({
      next: (animais) => {
        this.animal = animais;
      },
      error: (error) => {
        this.isErro = true;
        this.mensagem = error.error;
      },
    });
  }

  getUrlEspecifica(){
    return `${environment.apiUrl}/tutor/all/ativos`
  }

  confirmaVacina(){
    this.modalService.dismissAll;
    location.reload();
  }

  apiUrlPath(){
    return   `${environment.apiUrl}/vacina`;  
  }
}
