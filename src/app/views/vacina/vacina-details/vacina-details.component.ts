import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Animal } from 'src/app/models/animal/animal';
import { Vacina } from 'src/app/models/vacina/vacina';
import { VacinaService } from 'src/app/services/vacina/vacina.service';


@Component({
  selector: 'app-vacina-details',
  templateUrl: './vacina-details.component.html',
  styleUrls: ['./vacina-details.component.scss']
})
export class VacinaDetailsComponent implements OnInit {
@Input() chamandoAnimal : Animal = new Animal();
@Output() vacina = new EventEmitter<Vacina>();

@Input() chamandoVacina: Vacina = new Vacina();
@Input() editarVacina : Vacina = new Vacina();
service = inject(VacinaService);

disabled = false;
detailsMode = false;
id!: string;
url!: string;
router = inject(Router);
isErro : boolean = false;
mensagem! : string;



constructor(
  private route: ActivatedRoute,

  config: NgbModalConfig,
  private modalService: NgbModal
) {
  this.url = this.router.url;
  this.chamandoVacina = new Vacina();


}
ngOnInit(): void {
  this.id = this.route.snapshot.paramMap.get('id') as string;
  this.chamandoVacina = new Vacina();

  
  if(this.url.includes("vacina/")){
    console.log("vacina aqui")
    this.disabled = true;
    this.detailsMode = true;
  }

}



cadastrar(){
   this.chamandoVacina.animal = this.chamandoAnimal;
  this.service.create(this.chamandoVacina).subscribe({
    next: (chamandoVacina) => {
      this.vacina.emit(chamandoVacina);
      this.mensagem = "Vacina cadastrada com sucesso!"

      this.modalService.dismissAll;
    },
    error: (error) => {
      console.log(error.error);
      this.mensagem = "Houve um erro ao cadastrar sua vacina."

    }
    
  })
}

getById(id: number) {
  this.service.getById(id).subscribe({
    next: (vacina) => {
      this.chamandoVacina = vacina;

    },
    error: (error) => {
      this.isErro = true;
      this.mensagem = error.error;
    },
  });
}

}
