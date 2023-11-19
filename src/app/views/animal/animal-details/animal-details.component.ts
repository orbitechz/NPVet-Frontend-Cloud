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
import { AnimalService } from 'src/app/services/animal/animal.service';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class AnimalDetailsComponent implements OnInit {
  animal: Animal = new Animal();
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



  constructor(
    private route: ActivatedRoute,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    this.url = this.router.url;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;

  if(Number(this.id)){
    this.getById(Number(this.id));
    this.disabled = true;
    this.detailsMode = true;
    console.log("está desabilitado.");
    console.log(this.detailsMode)

    
  
  }
  
  }

  salvar() {

    console.log(this.animal)
    this.service.save(this.animal).subscribe({
      next: animais => {
        this.animal = animais;
        this.mensagem = "Animal cadastrado com sucesso!";
        this.moveTo();
        this.router.navigate(["['/web/animais']", this.animal.id]);
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
  callHeadersTutor(){
    let tableHeaders : Header[] = [];
    tableHeaders.push(new Header('Nome', 'nome'));
    tableHeaders.push(new Header('CPF', 'cpf'));
    tableHeaders.push(new Header('Data de Criação','createdAt'));    
    return tableHeaders;
  }

  selecionarTutor(tutor: Tutor){
    this.animal.tutorId = tutor
    this.modalService.dismissAll()
  }

  moveTo() {
    window.scrollTo(0, 0);
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
}
