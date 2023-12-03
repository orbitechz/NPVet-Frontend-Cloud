import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ConsultaService } from './consulta.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Consulta } from 'src/app/models/consulta/consulta';
import { Tutor } from 'src/app/models/tutor/tutor';
import { Animal } from 'src/app/models/animal/animal';
import { Sexo } from 'src/app/models/enums/sexo';
import { Genero } from 'src/app/models/enums/genero';
import { Status } from 'src/app/models/enums/status';
import { Anamnese } from 'src/app/models/anamnese/anamnese';
import { Usuario } from 'src/app/models/usuario/usuario';
import { Role } from 'src/app/models/enums/role';
import { environment } from 'src/environments/environment';

describe('ConsultaService', () => {
  let service: ConsultaService;
  let consulta: Consulta;
  let http: HttpTestingController;
  let testTutor: Tutor;
  let testAnimal: Animal;
  let anamnese: Anamnese;
  let usuario: Usuario;
  let baseURL = `${environment.apiUrl}/consulta`

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

    });
    service = TestBed.inject(ConsultaService);
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
      senha: 'senha_secreta',
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

  });

  it('should get a consulta by id', fakeAsync(() => {
    // const expectedConsultas: Consulta[] = [consulta];

    service.getById(1).subscribe((retorno) => {
      expect(retorno).toEqual(consulta);
    });

    const req = http.expectOne(`${baseURL}/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(consulta);
    tick();
  }));

  it('should get a consulta by animal id', fakeAsync(() => {
    const expectedConsultas: Consulta[] = [consulta];

    service.getByAnimalId(1).subscribe((retorno) => {
      expect(retorno).toEqual(expectedConsultas);
    });

    const req = http.expectOne(`${baseURL}/animal/id/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedConsultas);
    tick();
  }));

  it('should get a consulta by animal nome', fakeAsync(() => {
    const expectedConsultas: Consulta[] = [consulta];
    let nome = testAnimal.nome;
    service.getByAnimalNome(nome).subscribe((retorno) => {
      expect(retorno).toEqual(expectedConsultas);
    });

    const req = http.expectOne(`${baseURL}/animal/nome/${nome}`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedConsultas);
    tick();
  }));

  
  it('should get a consulta by vet nome', fakeAsync(() => {
    const expectedConsultas: Consulta[] = [consulta];
    let nome = usuario.nome;
    service.getByVetNome(nome).subscribe((retorno) => {
      expect(retorno).toEqual(expectedConsultas);
    });

    const req = http.expectOne(`${baseURL}/veterinario/nome/${nome}`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedConsultas);
    tick();
  }));

  it('should get a consulta by vet id', fakeAsync(() => {
    const expectedConsultas: Consulta[] = [consulta];
    let id = usuario.id;
    service.getConsultasByVeterinarioId(id).subscribe((retorno) => {
      expect(retorno).toEqual(expectedConsultas);
    });

    const req = http.expectOne(`${baseURL}/veterinario/${id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedConsultas);
    tick();
  }));

  it('should get a consulta by anamnese id', fakeAsync(() => {
    const expectedConsultas: Consulta[] = [consulta];
    let id = anamnese.id;
    service.getByAnamneseId(id).subscribe((retorno) => {
      expect(retorno).toEqual(expectedConsultas);
    });

    const req = http.expectOne(`${baseURL}/anamnese/${id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedConsultas);
    tick();
  }));

  it('should get a consulta by andamento', fakeAsync(() => {
    const expectedConsultas: Consulta[] = [consulta];
    service.getEmAndamento().subscribe((retorno) => {
      expect(retorno).toEqual(expectedConsultas);
    });

    const req = http.expectOne(`${baseURL}/em-andamento`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedConsultas);
    tick();
  }));

  it('should get a consulta by concluida', fakeAsync(() => {
    const expectedConsultas: Consulta[] = [consulta];
    service.getConcluida().subscribe((retorno) => {
      expect(retorno).toEqual(expectedConsultas);
    });

    const req = http.expectOne(`${baseURL}/concluida`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedConsultas);
    tick();
  }));

  it('should get a consulta by cancelada', fakeAsync(() => {
    const expectedConsultas: Consulta[] = [consulta];
    service.getCanceladas().subscribe((retorno) => {
      expect(retorno).toEqual(expectedConsultas);
    });

    const req = http.expectOne(`${baseURL}/cancelada`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedConsultas);
    tick();
  }));

  it('should get a consulta by agendada', fakeAsync(() => {
    const expectedConsultas: Consulta[] = [consulta];
    service.getAgendada().subscribe((retorno) => {
      expect(retorno).toEqual(expectedConsultas);
    });

    const req = http.expectOne(`${baseURL}/agendada`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedConsultas);
    tick();
  }));

  it('should create an consulta', fakeAsync(() => {
    service.create(consulta).subscribe((result) => {
      expect(result).toBe(consulta);
    });

    const req = http.expectOne(`${baseURL}/post`);
    expect(req.request.method).toEqual('POST');
    req.flush(consulta);
    tick();
  }));
});
