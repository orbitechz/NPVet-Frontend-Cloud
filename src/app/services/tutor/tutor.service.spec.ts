import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TutorService } from './tutor.service';
import { Tutor } from 'src/app/models/tutor/tutor';
import { environment } from 'src/environments/environment';
import { Genero } from 'src/app/models/enums/genero';


describe('TutorService', () => {
  let service: TutorService;
  let http: HttpTestingController;
  let baseURL = `${environment.apiUrl}/tutor`
    let tutor: Tutor;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

    });
    service = TestBed.inject(TutorService);
    http = TestBed.inject(HttpTestingController);
    
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  beforeEach(() => {
    tutor = {
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
});

it('should get a tutor by id', fakeAsync(() => {
    // const expectedTutor: Tutor[] = [tutor];

    service.getById(1).subscribe((retorno) => {
      expect(retorno).toEqual(tutor);
    });

    const req = http.expectOne(`${baseURL}/id/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(tutor);
    tick();
  }));

  it('should get a tutor by nome', fakeAsync(() => {
    // const expectedTutor: Tutor[] = [tutor];

    service.getByNome(tutor.nome).subscribe((retorno) => {
      expect(retorno).toEqual(tutor);
    });

    const req = http.expectOne(`${baseURL}/nome/${tutor.nome}`);
    expect(req.request.method).toEqual('GET');
    req.flush(tutor);
    tick();
  }));


  it('should get a tutor all', fakeAsync(() => {
    const expectedTutor: Tutor[] = [tutor];

    service.getAll().subscribe((retorno) => {
      expect(retorno).toEqual(expectedTutor);
    });

    const req = http.expectOne(`${baseURL}/all`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedTutor);
    tick();
  }));

  it('should get a tutor all ativos', fakeAsync(() => {
    const expectedTutor: Tutor[] = [tutor];

    service.getAllAtivados().subscribe((retorno) => {
      expect(retorno).toEqual(expectedTutor);
    });

    const req = http.expectOne(`${baseURL}/all/ativos`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedTutor);
    tick();
  }));

  it('should get a tutor all desativos', fakeAsync(() => {
    const expectedTutor: Tutor[] = [tutor];

    service.getAllDesativados().subscribe((retorno) => {
      expect(retorno).toEqual(expectedTutor);
    });

    const req = http.expectOne(`${baseURL}/all/desativados`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedTutor);
    tick();
  }));

  it('should get a tutor by cpf', fakeAsync(() => {
    // const expectedTutor: Tutor[] = [tutor];

    service.getByCpf(tutor.cpf).subscribe((retorno) => {
      expect(retorno).toEqual(tutor);
    });

    const req = http.expectOne(`${baseURL}/cpf/${tutor.cpf}`);
    expect(req.request.method).toEqual('GET');
    req.flush(tutor);
    tick();
  }));

  it('should get a tutor by rg', fakeAsync(() => {
    // const expectedTutor: Tutor[] = [tutor];

    service.getByRg(tutor.rg).subscribe((retorno) => {
      expect(retorno).toEqual(tutor);
    });

    const req = http.expectOne(`${baseURL}/rg/${tutor.rg}`);
    expect(req.request.method).toEqual('GET');
    req.flush(tutor);
    tick();
  }));

  it('should create an tutor', fakeAsync(() => {
    service.create(tutor).subscribe((result) => {
      expect(result).toBe(tutor);
    });

    const req = http.expectOne(`${baseURL}/post`);
    expect(req.request.method).toEqual('POST');
    req.flush(tutor);
    tick();
  }));

  it('should update an tutor', fakeAsync(() => {
    service.update(tutor.id, tutor).subscribe((result) => {
      expect(result).toBe(tutor);
    });

    const req = http.expectOne(`${baseURL}/update/${tutor.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(tutor);
    tick();
  }));

  it('should delete an tutor', fakeAsync(() => {
    service.delete(tutor.id).subscribe((result) => {
      expect(result).toBe(tutor);
    });

    const req = http.expectOne(`${baseURL}/delete/${tutor.id}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(tutor);
    tick();
  }));

  it('should active an tutor', fakeAsync(() => {
    service.activate(tutor.id).subscribe((result) => {
      expect(result).toBe(tutor);
    });

    const req = http.expectOne(`${baseURL}/activate/${tutor.id}`);
    expect(req.request.method).toEqual('POST');
    req.flush(tutor);
    tick();
  }));

});
