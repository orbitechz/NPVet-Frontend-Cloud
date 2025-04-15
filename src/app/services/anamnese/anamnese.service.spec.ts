import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AnamneseService } from './anamnese.service';
import { Tutor } from 'src/app/models/tutor/tutor';
import { Animal } from 'src/app/models/animal/animal';
import { Anamnese } from 'src/app/models/anamnese/anamnese';
import { Usuario } from 'src/app/models/usuario/usuario';
import { environment } from 'src/environments/environment';
import { Sexo } from 'src/app/models/enums/sexo';
import { Role } from 'src/app/models/enums/role';
import { Genero } from 'src/app/models/enums/genero';
import { AnamnesePergunta } from 'src/app/models/anamnese-pergunta/anamnese-pergunta';
import { ProgressoMedico } from 'src/app/models/progresso-medico/progresso-medico';
import { Consulta } from 'src/app/models/consulta/consulta';

describe('AnamneseService', () => {
  let service: AnamneseService;
  let http: HttpTestingController;
  let testTutor: Tutor;
  let testAnimal: Animal;
  let anamnese: Anamnese;
  let usuario: Usuario;
  let baseURL = `${environment.apiUrl}/anamnese`
  let pergunta: AnamnesePergunta;
  let progressoMedico: ProgressoMedico

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
});
    service = TestBed.inject(AnamneseService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  beforeEach(() => {
    testTutor = {
      id: 1,
      nome: 'Tutor Teste',
      genero: Genero.MASCULINO,
      cpf: '123.456.789-10',
      rg: '12546789',
      email: 'email@teste.com',
      telefones: [],
      enderecos: [],
      createdAt: new Date(),
      deletedAt: new Date(),
      updatedAt: new Date(),
    };
    
    usuario = {
      id: 1,
      nome: 'Nome do Usuário',
      cpf: '123.456.789-10',
      role: Role.ADMINISTRADOR,
      username: 'nome_usuario',
      password: 'senha_secreta',
      token: 'token_gerado',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date()
    }

    testAnimal = {
      id: 1,
      nome: 'Teste Animal',
      sexo: Sexo.MACHO,
      createdAt: new Date(),
      raca: 'Raça Teste',
      especie: 'Especie Teste',
      idade: 1,
      pelagem: 'Pelagem Teste',
      peso: 11.5,
      tutorId: testTutor,
      procedencia: 'Procedencia Teste',
      deletedAt: new Date(),
      anamneses: [],
      consulta: [],
      vacinas: [],
      updatedAt: new Date(),
    };
    
    anamnese = {
      id: 1,
      animalDTO: testAnimal,
      tutorDTO: testTutor,
      veterinarioDTO: usuario, 
      queixaPrincipal: 'Queixa Teste',
      historicoProgressoMedico: [],
      alimentacao: 'Alimentacao Teste',
      contactantes: 'Contactantes Teste',
      ambiente: 'Ambiente Teste',
      vacinacao: 'Vacinacao Teste',
      vermifugacao: 'Vermifugacao Teste',
      sistemaRespiratorio: 'Sistema Respiratorio Teste',
      sistemaCardiovascular: 'Sistema Cardiovascular Teste',
      sistemaUrinario: 'Sistema Urinario Teste',
      sistemaReprodutor: 'Sistema Reprodutor Teste',
      sistemaLocomotor: 'Sistema Locomotor Teste',
      sistemaNeurologico: 'Sistema Neurologico Teste',
      sistemaDigestorio: 'Sistema Digestorio Teste',
      pele: 'Pele Teste',
      olhos: 'Olhos Teste',
      ouvidos: 'Ouvidos Teste',
      anamnesePerguntas: [],
      consulta: new Consulta(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };

    pergunta = {
      id: 1,
      createdAt: new Date(),
      deletedAt: new Date(),
      updatedAt: new Date(),
      pergunta: 'Teste',
      resposta: 'Teste'
    }

    progressoMedico = {
      progressoMedico: 'Teste',
      data: new Date(),
      id: 1,
      createdAt: new Date(),
      deletedAt: new Date(),
      updatedAt: new Date(),
    }
  });

  it('should get a anamnese by id', fakeAsync(() => {
    // const expectedAnamnese: Anamnese[] = [anamnese];

    service.getById(1).subscribe((retorno) => {
      expect(retorno).toEqual(anamnese);
    });

    const req = http.expectOne(`${baseURL}/${anamnese.id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(anamnese);
    tick();
  }));

  it('should get a anamnese all', fakeAsync(() => {
    const expectedAnamnese: Anamnese[] = [anamnese];


    service.getAll().subscribe((retorno) => {
      expect(retorno).toEqual(expectedAnamnese);
    });

    const req = http.expectOne(`${baseURL}/all`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedAnamnese);
    tick();
  }));

  it('should get a anamnese by tutor cpf', fakeAsync(() => {
    const expectedAnamnese: Anamnese[] = [anamnese];

    service.getByTutorCpf(testTutor.cpf).subscribe((retorno) => {
      expect(retorno).toEqual(expectedAnamnese);
    });

    const req = http.expectOne(`${baseURL}/tutor/${testTutor.cpf}`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedAnamnese);
    tick();
  }));

  it('should get a anamnese by tutor cpf and animal', fakeAsync(() => {
    const expectedAnamnese: Anamnese[] = [anamnese];

    service.getByTutorCpfAndAnimal(testTutor.cpf, testAnimal.nome).subscribe((retorno) => {
      expect(retorno).toEqual(expectedAnamnese);
    });

    const req = http.expectOne(`${baseURL}/tutor/${testTutor.cpf}/animal/${testAnimal.nome}`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedAnamnese);
    tick();
  }));

  it('should save an anamnese', fakeAsync(() => {
    service.create(anamnese).subscribe((result) => {
      expect(result).toBe(anamnese);
    });

    const req = http.expectOne(`${baseURL}/post`);
    expect(req.request.method).toEqual('POST');
    req.flush(anamnese);
    tick();
  }));

  it('should update an anamnese', fakeAsync(() => {
    service.update(anamnese.id, anamnese).subscribe((result) => {
      expect(result).toBe(anamnese);
    });

    const req = http.expectOne(`${baseURL}/update/${anamnese.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(anamnese);
    tick();
  }));

  it('should delete an anamnese', fakeAsync(() => {
    service.delete(anamnese.id).subscribe((result) => {
      expect(result).toBe('Deletado');
    });

    const req = http.expectOne(`${baseURL}/delete/${anamnese.id}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush('Deletado');
    tick();
  }));

  it('should new question an anamnese', fakeAsync(() => {
    service.addQuestionAnswerToAnamnese(anamnese.id, pergunta).subscribe((result) => {
      expect(result).toBe(pergunta);
    });

    const req = http.expectOne(`${baseURL}/adicionar/pergunta/${anamnese.id}`);
    expect(req.request.method).toEqual('POST');
    req.flush(pergunta);
    tick();
  }));

  it('should new progresso medico an anamnese', fakeAsync(() => {
    service.addProgressoMedico(progressoMedico).subscribe((result) => {
      expect(result).toBe(progressoMedico);
    });

    const req = http.expectOne(`${baseURL}/atualizar/progresso-medico`);
    expect(req.request.method).toEqual('POST');
    req.flush(progressoMedico);
    tick();
  }));
});
