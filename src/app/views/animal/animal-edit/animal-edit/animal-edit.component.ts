import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Animal } from 'src/app/models/animal/animal';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { Location } from '@angular/common';
import { Header } from 'src/app/components/table/header';
import { Tutor } from 'src/app/models/tutor/tutor';
import { Sexo } from 'src/app/models/enums/sexo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.component.html',
  styleUrls: ['./animal-edit.component.scss']
})
export class AnimalEditComponent {
  id: string;

  animal: Animal = new Animal();

  service = inject(AnimalService);
  isErro : boolean = false;
  mensagem! : string;

  disabled = false;

  keys = Object.keys;
  sexos = Sexo;



  constructor(
    private route: ActivatedRoute,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private location: Location
  ) {
    const path = location.path();
    const parts = path.split('/');
    this.id = parts[parts.length - 1];
    this.getAnimalById(this.id);

  }

  ngOnInit(): void {
  }

  getAnimalById(id: string){
    this.service.getById(Number(this.id)).subscribe({
      next: async (animais) => {
        this.animal = animais;
      },
      error: (erro) => {
        console.log(erro.error);
      }
    });
  }

  salvar() {

    console.log(this.animal)
    this.service.update(this.animal.id, this.animal).subscribe({
      next: animais => {
        this.animal = animais;
        this.mensagem = "Animal editado com sucesso!";
      },
      error: (erro) => {
        console.log(erro.error);
        this.isErro = true;
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
  getUrlEspecifica(){
    return `${environment.apiUrl}/tutor/all/ativos`
  }
}

