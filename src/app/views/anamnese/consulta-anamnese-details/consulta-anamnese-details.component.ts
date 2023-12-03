import { Component, Input, OnInit } from '@angular/core';
import { Anamnese } from 'src/app/models/anamnese/anamnese';
import { provideNgxMask } from 'ngx-mask';
import { TutorService } from 'src/app/services/tutor/tutor.service';
import { Genero } from 'src/app/models/enums/genero';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { Animal } from 'src/app/models/animal/animal';
import { ActivatedRoute, Router } from '@angular/router';
import { AnamneseService } from 'src/app/services/anamnese/anamnese.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ProgressoMedico } from 'src/app/models/progresso-medico/progresso-medico';
import { Sexo } from 'src/app/models/enums/sexo';
import { AnamnesePergunta } from 'src/app/models/anamnese-pergunta/anamnese-pergunta';
import { Contato } from 'src/app/models/contato/contato';
import { ConsultaService } from 'src/app/services/consulta/consulta.service';

@Component({
  selector: 'app-consulta-anamnese-details',
  templateUrl: './consulta-anamnese-details.component.html',
  styleUrls: ['./consulta-anamnese-details.component.scss'],
  providers: [provideNgxMask()],
})
export class ConsultaAnamneseDetailsComponent implements OnInit {
  anamnese = new Anamnese();
  generoEnum = Genero;
  sexoEnum = Sexo;
  telefones: any[] = [];
  endereco: any[] = [];
  selectedGenero = Genero.FEMININO;
  selectedSexo = Sexo.FEMEA;

  @Input() isErro = true;
  @Input() mensagem = '';
  animal = new Animal();
  doesntExistAnimal: boolean = false;

  showInputs: boolean = false;


  constructor(
    private t: TutorService,
    private a: AnimalService,
    private u: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private an: AnamneseService,
    private c: ConsultaService,
  ) { }

  ngOnInit(): void {


    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.c.getById(id).subscribe({
        next: (an) => {
          this.anamnese.animalDTO = an.animal;
          this.anamnese.tutorDTO = an.tutor;
          this.anamnese.veterinarioDTO = an.veterinario;
        },
        error: (err) => {
          console.log(err);
        },
      });
    });    
  }

  addNewRow() {
    this.anamnese.historicoProgressoMedico.push(new ProgressoMedico(
      '',
      new Date()
    ));
  }

  removeRow(lista: any[], i:any){
    lista.splice(i, 1);
  }


  addNewQuestion() {
    this.showInputs = !this.showInputs;

    const newQuestion = new AnamnesePergunta();
    newQuestion.pergunta = '';
    newQuestion.resposta = '';
    this.anamnese.anamnesePerguntas.push(newQuestion);

  }

  addTelefone() {
    const phone = new Contato();
    phone.telefone = '';
  
    this.anamnese.tutorDTO.telefones.push(phone);
  }

  fetchAnimal() {
    this.a
      .getByTutorAndAnimalName(
        this.anamnese.tutorDTO.id,
        this.anamnese.animalDTO.nome
      )
      .subscribe({
        next: (animal) => {
          this.anamnese.animalDTO = animal;

        },
        error: (err) => {
          if (err.status == 400) {
            this.doesntExistAnimal = true;
            this.anamnese.animalDTO.especie = '';
            this.anamnese.animalDTO.raca = '';
            this.anamnese.animalDTO.idade = 0;
            this.anamnese.animalDTO.peso = 0;
            this.anamnese.animalDTO.pelagem = '';
            this.anamnese.animalDTO.procedencia = '';
            this.anamnese.animalDTO.sexo = Sexo.MACHO;
            this.anamnese.animalDTO.consulta = [];
          } else {
            this.isErro = true;
            this.mensagem = err.error;
          }
        },
      });
  }

  fetchTutor() {
      this.t.getByCpf(this.formatCpf(this.anamnese.tutorDTO.cpf)).subscribe({
        next: (tutor) => {
          this.anamnese.tutorDTO = tutor;
          this.selectedGenero = tutor.genero;
          this.telefones = tutor.telefones;
          this.endereco = tutor.enderecos;
        },
        error: (err) => {
          this.isErro = true;
          this.mensagem = err.error;
        },
      });

  }

  formatCpf(cpf: string): string {
    const unformattedCpf = cpf.replace(/[.-]/g, '');
      return `${unformattedCpf.slice(0, 3)}.${unformattedCpf.slice(3, 6)}.${unformattedCpf.slice(6, 9)}-${unformattedCpf.slice(9)}`;
  }
  

  cadastrarAnamnese() {
    this.t.update(this.anamnese.tutorDTO.id, this.anamnese.tutorDTO).subscribe({
      next: (tutor) => { },
      error: (err) => {
        this.isErro = true;
        this.mensagem = err.error;
      },
    });

    this.a
      .getByTutorAndAnimalName(
        this.anamnese.tutorDTO.id,
        this.anamnese.animalDTO.nome
      )
      .subscribe({
        next: (a) => {
          this.a.update(this.anamnese.animalDTO.id,this.anamnese.animalDTO).subscribe({
            next: (animal) => {
              this.anamnese.animalDTO = animal;
            },
            error: (err) => {
              this.isErro = true;
              this.mensagem = err.error;
            },
          });
        },
        error: (err) => {
          this.a.save(this.anamnese.animalDTO).subscribe({
            next: (animal) => {
              this.anamnese.animalDTO = animal;
            },
            error: (err) => {
              this.isErro = true;
              this.mensagem = err.error;
            },
          });
        },
      });

    this.an.create(this.anamnese).subscribe({
      next: (anamnese) => {
        this.isErro = false;
        this.mensagem = 'Anamnese cadastrada com sucesso!';
        window.scrollTo(0, 0);

      },
      error: (err) => {
        this.isErro = true;
        this.mensagem = err.error;
        window.scrollTo(0, 0);

      },
    });
  }

  dateNow() {
    const todaysDate = new Date();
    const day = String(todaysDate.getDate()).padStart(2, '0');
    const month = String(todaysDate.getMonth() + 1).padStart(2, '0');
    const year = String(todaysDate.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }

  cadastrarNovo() {
    this.router.navigate(['web/tutor/register']);
  }
}
