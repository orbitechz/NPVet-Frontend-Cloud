import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Animal } from 'src/app/models/animal/animal';
import { Vacina } from 'src/app/models/vacina/vacina';
import { VacinaService } from 'src/app/services/vacina/vacina.service';

@Component({
  selector: 'app-vacina-details',
  templateUrl: './vacina-details.component.html',
  styleUrls: ['./vacina-details.component.scss']
})
export class VacinaDetailsComponent {
@Input() chamandoAnimal! : Animal;
@Output() vacina = new EventEmitter<Vacina>();
chamandoVacina! : Vacina;
service = inject(VacinaService);
constructor(){

}

cadastrar(){
  this.chamandoVacina.animal = this.chamandoAnimal;
  this.service.create(this.chamandoVacina).subscribe({
    next: (chamandoVacina) => {
      this.vacina.emit(chamandoVacina);
    },
    error: (error) => {
      console.log(error.error);
    }
  })
}

}
