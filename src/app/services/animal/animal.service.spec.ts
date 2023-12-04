import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AnimalService } from './animal.service';
import { Animal } from 'src/app/models/animal/animal';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Sexo } from 'src/app/models/enums/sexo';
import { Tutor } from 'src/app/models/tutor/tutor';
import { environment } from 'src/environments/environment';
import { Genero } from 'src/app/models/enums/genero';
import { HttpStatusCode } from '@angular/common/http';

describe('AnimalService', () => {
  let service: AnimalService;
  let http: HttpTestingController;
  let testAnimal: Animal;
  let baseURL = `${environment.apiUrl}/animal`
  let testTutor: Tutor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(AnimalService);
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
      updatedAt: new Date()
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
      updatedAt: new Date()
  };
  });

  
  it('should get a animal by id', fakeAsync(() => {
    service.getById(1).subscribe((animal) => {
      expect(animal).toEqual(testAnimal);
    });

    const req = http.expectOne(`${baseURL}/id/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(testAnimal);
    tick();
  }));

  it('should get a animal by nome', fakeAsync(() => {
    const expectedAnimais: Animal[] = [testAnimal];

    let nome = testAnimal.nome
    service.getByNome(nome).subscribe((animal) => {
      expect(animal).toEqual(expectedAnimais);
    });

    const req = http.expectOne(`${baseURL}/nome/${nome}`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedAnimais);
    tick();
  }));

  it('should get a animal by raça', fakeAsync(() => {
    const expectedAnimais: Animal[] = [testAnimal];

    let raca = testAnimal.raca
    service.getByRaca(raca).subscribe((animal) => {
      expect(animal).toEqual(expectedAnimais);
    });

    const req = http.expectOne(`${baseURL}/raca/${raca}`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedAnimais);
    tick();
  }));

  it('should get a animal by especie', fakeAsync(() => {
    const expectedAnimais: Animal[] = [testAnimal];

    let especie = testAnimal.especie
    service.getByEspecie(especie).subscribe((animal) => {
      expect(animal).toEqual(expectedAnimais);
    });

    const req = http.expectOne(`${baseURL}/especie/${especie}`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedAnimais);
    tick();
  }));

  it('should get a animal by tutor', fakeAsync(() => {
    const expectedAnimais: Animal[] = [testAnimal];

    service.getByTutor(1).subscribe((animal) => {
      expect(animal).toEqual(expectedAnimais);
    });

    const req = http.expectOne(`${baseURL}/tutor/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedAnimais);
    tick();
  }));

  it('should get a animal by tutor id and nome', fakeAsync(() => {

    service.getByTutorAndAnimalName(testTutor.id, testAnimal.nome).subscribe((animal) => {
      expect(animal).toEqual(testAnimal);
    });
    let nome = testAnimal.nome
    const req = http.expectOne(`${baseURL}/tutor/1/nome/${nome}`);
    expect(req.request.method).toEqual('GET');
    req.flush(testAnimal);
    tick();
  }));

  it('should get all animal', fakeAsync(() => {
    const expectedAnimais: Animal[] = [testAnimal];

    service.getAll().subscribe((animal) => {
      expect(animal).toEqual(expectedAnimais);
    });

    const req = http.expectOne(`${baseURL}/all`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedAnimais);
    tick();
  }));

  it('should get all desativos animal', fakeAsync(() => {
    const expectedAnimais: Animal[] = [testAnimal];

    service.getAllDesativados().subscribe((animal) => {
      expect(animal).toEqual(expectedAnimais);
    });

    const req = http.expectOne(`${baseURL}/all/desativados`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedAnimais);
    tick();
  }));

  it('should get all ativos animal', fakeAsync(() => {
    const expectedAnimais: Animal[] = [testAnimal];

    service.getAllAtivo().subscribe((animal) => {
      expect(animal).toEqual(expectedAnimais);
    });

    const req = http.expectOne(`${baseURL}/all/ativos`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedAnimais);
    tick();
  }));

  it('should save an animal', fakeAsync(() => {
    service.save(testAnimal).subscribe((result) => {
      expect(result).toBe(testAnimal);
    });

    const req = http.expectOne(`${baseURL}/post`);
    expect(req.request.method).toEqual('POST');
    req.flush(testAnimal);
    tick();
  }));

  it('should update an animal', fakeAsync(() => {
    service.update(testAnimal.id, testAnimal).subscribe((result) => {
      expect(result).toBe(testAnimal);
    });

  const req = http.expectOne(`${baseURL}/update/${testAnimal.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(testAnimal);
    tick();
  }));

  it('should delete an animal', fakeAsync(() => {
    service.delete(1).subscribe((result) => {
      expect(result).toBe(200);
    });

  const req = http.expectOne(`${baseURL}/delete/1`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(200);
    tick();
  }));


});
