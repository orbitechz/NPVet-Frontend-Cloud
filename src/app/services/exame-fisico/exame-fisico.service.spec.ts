import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Time } from '@angular/common';

import { ExameFisicoService } from './exame-fisico.service';
import { ExameFisico } from 'src/app/models/exame-fisico/exame-fisico';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/models/usuario/usuario';
import { Anamnese } from 'src/app/models/anamnese/anamnese';
import { Animal } from 'src/app/models/animal/animal';
import { Tutor } from 'src/app/models/tutor/tutor';
import { Status } from 'src/app/models/enums/status';
import { Consulta } from 'src/app/models/consulta/consulta';
import { Role } from 'src/app/models/enums/role';
import { Genero } from 'src/app/models/enums/genero';
import { Sexo } from 'src/app/models/enums/sexo';

describe('ExameFisicoService', () => {
  let service: ExameFisicoService;
  let http: HttpTestingController;
  let exameFisico: ExameFisico;
  let testTutor: Tutor;
  let testAnimal: Animal;
  let anamnese: Anamnese;
  let usuario: Usuario;
  let baseURL = `${environment.apiUrl}/examefisico`
  let consulta: Consulta;


  beforeEach(() => {
    TestBed.configureTestingModule({      
      imports: [HttpClientTestingModule], 
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

    });
    service = TestBed.inject(ExameFisicoService);
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
  
      consulta = {
        id: 1,
        animal: testAnimal,
        tutor: testTutor,
        anamnese: anamnese,
        data: new Date(),
        status: Status.AGENDADA,
        veterinario: usuario, 
        examesFisicos: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      }
      exameFisico = new ExameFisico();
      exameFisico.nivelConsciencia = 'Bom';
      exameFisico.temperaturaRetal = 20.7;
      exameFisico.frequenciaRespiratoria = 22;  // Novo valor para frequenciaRespiratoria
      exameFisico.frequenciaCardiaca = 95;      // Novo valor para frequenciaCardiaca
      exameFisico.pulso = 75;                   // Novo valor para pulso
      exameFisico.hidratacao = 'Excelente';     // Novo valor para hidratacao
      exameFisico.linfSubmand = 'Alterado';     // Novo valor para linfSubmand
      exameFisico.linfPreEscapulares = 'Alterado';  // Novo valor para linfPreEscapulares
      exameFisico.linfPopliteos = 'Alterado';   // Novo valor para linfPopliteos
      exameFisico.linfInguinais = 'Alterado';   // Novo valor para linfInguinais
      exameFisico.mucosaOcular = 'Modificada';  // Novo valor para mucosaOcular
      exameFisico.mucosaOral = 'Modificada';    // Novo valor para mucosaOral
      exameFisico.mucosaPeniana = 'Modificada'; // Novo valor para mucosaPeniana
      exameFisico.mucosaAnal = 'Modificada';    // Novo valor para mucosaAnal
      exameFisico.animal = testAnimal;      // Nova atribuição para a propriedade animal
      exameFisico.consulta = consulta;      // Nova atribuição para a propriedade consulta
      exameFisico.id = 1;
      exameFisico.createdAt = new Date();
      exameFisico.updatedAt = new Date();
      exameFisico.deletedAt = new Date();
  
    });


  it('should get a exame by id', fakeAsync(() => {
    // const expectedConsultas: Consulta[] = [consulta];

    service.getById(1).subscribe((retorno) => {
      expect(retorno).toEqual(exameFisico);
    });

    const req = http.expectOne(`${baseURL}/id/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(exameFisico);
    tick();
  }));

  it('should get a exame getByAnimalNome', fakeAsync(() => {
    const expectedExames: ExameFisico[] = [exameFisico];

    let nome = testAnimal.nome
    service.getByAnimalNome(nome).subscribe((retorno) => {
      expect(retorno).toEqual(expectedExames);
    });

    const req = http.expectOne(`${baseURL}/animal/nome/${nome}`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedExames);
    tick();
  }));

  it('should get a exame getByAnimalId', fakeAsync(() => {
    const expectedExames: ExameFisico[] = [exameFisico];

    let id = testAnimal.id
    service.getByAnimalId(id).subscribe((retorno) => {
      expect(retorno).toEqual(expectedExames);
    });

    const req = http.expectOne(`${baseURL}/animal/id/${id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedExames);
    tick();
  }));

  it('should get a exame getAll', fakeAsync(() => {
    const expectedExames: ExameFisico[] = [exameFisico];

    service.getAll().subscribe((retorno) => {
      expect(retorno).toEqual(expectedExames);
    });

    const req = http.expectOne(`${baseURL}/all`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedExames);
    tick();
  }));

  it('should create an exame', fakeAsync(() => {
    service.save(exameFisico).subscribe((result) => {
      expect(result).toBe(exameFisico);
    });

    const req = http.expectOne(`${baseURL}/post`);
    expect(req.request.method).toEqual('POST');
    req.flush(exameFisico);
    tick();
  }));

  it('should update an exame', fakeAsync(() => {
    service.update(exameFisico).subscribe((result) => {
      expect(result).toBe(exameFisico);
    });

  const req = http.expectOne(`${baseURL}/update/${exameFisico.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(exameFisico);
    tick();
  }));

  it('should delete an exame', fakeAsync(() => {
    service.delete(1).subscribe((result) => {
      expect(result).toBe(200);
    });

  const req = http.expectOne(`${baseURL}/delete/1`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(200);
    tick();
  }));
}); 
