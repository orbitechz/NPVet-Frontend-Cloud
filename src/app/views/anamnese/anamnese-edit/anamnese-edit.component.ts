import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import { AnamnesePergunta } from 'src/app/models/anamnese-pergunta/anamnese-pergunta';
import { Anamnese } from 'src/app/models/anamnese/anamnese';
import { Contato } from 'src/app/models/contato/contato';
import { Genero } from 'src/app/models/enums/genero';
import { Sexo } from 'src/app/models/enums/sexo';
import { ProgressoMedico } from 'src/app/models/progresso-medico/progresso-medico';
import { AnamneseService } from 'src/app/services/anamnese/anamnese.service';
import { ConsultaService } from 'src/app/services/consulta/consulta.service';

@Component({
  selector: 'app-anamnese-edit',
  templateUrl: './anamnese-edit.component.html',
  styleUrls: ['./anamnese-edit.component.scss'],
  providers: [provideNgxMask()],
})
export class AnamneseEditComponent implements OnInit {
  anamnese = new Anamnese();
  @Input() isErro = true;
  @Input() mensagem = '';
  selectedGenero = Genero.FEMININO;
  selectedSexo = Sexo.FEMEA;
  generoEnum = Genero;
  sexoEnum = Sexo;
  showInputs: boolean = false;
  editing: boolean = false;

  constructor(
    private an: AnamneseService,
    private route: ActivatedRoute,
    private router: Router,
    private c: ConsultaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.an.getById(id).subscribe({
        next: (an) => {
          console.log(an);
          this.anamnese = an;
        },
        error: (err) => {
          console.log(err);
        },
      });
    });

    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.c.getById(id).subscribe({
        next: (an) => {
          this.anamnese.animalDTO = an.animal;
          this.anamnese.tutorDTO = an.tutor;
          this.anamnese.veterinarioDTO = an.veterinario;
          this.anamnese.consulta = an
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  dateNow() {
    const todaysDate = new Date();
    const day = String(todaysDate.getDate()).padStart(2, '0');
    const month = String(todaysDate.getMonth() + 1).padStart(2, '0');
    const year = String(todaysDate.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }

  addTelefone() {
    const phone = new Contato();
    phone.telefone = '';

    this.anamnese.tutorDTO.telefones.push(phone);
  }

  addNewRow() {
    this.anamnese.historicoProgressoMedico.push(
      new ProgressoMedico('', new Date())
    );
  }

  removeRow(lista: any[], i: any) {
    lista.splice(i, 1);
  }

  addNewQuestion() {
    this.showInputs = !this.showInputs;

    const newQuestion = new AnamnesePergunta();
    newQuestion.pergunta = '';
    newQuestion.resposta = '';
    this.anamnese.anamnesePerguntas.push(newQuestion);
  }

  editAnamnese() {
    this.editing = !this.editing;
  }

  cancel() {
    this.editing = false;
    this.ngOnInit();
  }

  salvarAnamnese() {
    this.an.update(this.anamnese.id, this.anamnese).subscribe({
      next: (an) => {
        this.anamnese = an;
        this.router.navigate(['/web/consultas']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
