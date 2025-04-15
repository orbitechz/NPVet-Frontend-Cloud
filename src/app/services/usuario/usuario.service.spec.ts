import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsuarioService } from './usuario.service';
import { Usuario } from 'src/app/models/usuario/usuario';
import { environment } from 'src/environments/environment';
import { Role } from 'src/app/models/enums/role';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let usuario: Usuario;
  let baseURL = `${environment.apiUrl}/usuario`
  let http: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

    });
    service = TestBed.inject(UsuarioService);
    http = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  beforeEach(() => {
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
  });

  it('should get a usuario by id', fakeAsync(() => {
    // const expectedConsultas: Consulta[] = [consulta];

    service.getById(1).subscribe((retorno) => {
      expect(retorno).toEqual(usuario);
    });

    const req = http.expectOne(`${baseURL}/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(usuario);
    tick();
  }));

  it('should get a usuario by all', fakeAsync(() => {
    const expectedUsuarios: Usuario[] = [usuario];

    service.getAll().subscribe((retorno) => {
      expect(retorno).toEqual(expectedUsuarios);
    });

    const req = http.expectOne(`${baseURL}/all`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedUsuarios);
    tick();
  }));

  it('should get a usuario by nome', fakeAsync(() => {
    const expectedUsuarios: Usuario[] = [usuario];

    let nome = usuario.nome
    service.getUsuarioByName(nome).subscribe((retorno) => {
      expect(retorno).toEqual(expectedUsuarios);
    });

    const req = http.expectOne(`${baseURL}/nome/${nome}`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedUsuarios);
    tick();
  }));

  it('should get a usuario by secretaria', fakeAsync(() => {
    const expectedUsuarios: Usuario[] = [usuario];

    service.getSecretaria().subscribe((retorno) => {
      expect(retorno).toEqual(expectedUsuarios);
    });

    const req = http.expectOne(`${baseURL}/secretaria`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedUsuarios);
    tick();
  }));
  
  it('should get a usuario by adm', fakeAsync(() => {
    const expectedUsuarios: Usuario[] = [usuario];

    service.getAdm().subscribe((retorno) => {
      expect(retorno).toEqual(expectedUsuarios);
    });

    const req = http.expectOne(`${baseURL}/adm`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedUsuarios);
    tick();
  }));

  it('should get a usuario by vet', fakeAsync(() => {
    const expectedUsuarios: Usuario[] = [usuario];

    service.getVeterinarios().subscribe((retorno) => {
      expect(retorno).toEqual(expectedUsuarios);
    });

    const req = http.expectOne(`${baseURL}/veterinarios`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedUsuarios);
    tick();
  }));

  it('should get a usuario by username', fakeAsync(() => {
    const expectedUsuarios: Usuario[] = [usuario];

    let username = usuario.username
    service.getUsername(username).subscribe((retorno) => {
      expect(retorno).toEqual(expectedUsuarios);
    });

    const req = http.expectOne(`${baseURL}/username/${username}`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedUsuarios);
    tick();
  }));

  it('should get a usuario by username', fakeAsync(() => {
    const expectedUsuarios: Usuario[] = [usuario];

    let cpf = usuario.cpf
    service.getUsuarioByCpf(cpf).subscribe((retorno) => {
      expect(retorno).toEqual(expectedUsuarios);
    });

    const req = http.expectOne(`${baseURL}/cpf/${cpf}`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedUsuarios);
    tick();
  }));

  it('should create an user', fakeAsync(() => {
    service.create(usuario).subscribe((result) => {
      expect(result).toBe(usuario);
    });

    const req = http.expectOne(`${baseURL}/post`);
    expect(req.request.method).toEqual('POST');
    req.flush(usuario);
    tick();
  }));

  it('should update an user', fakeAsync(() => {
    service.update(usuario.id, usuario).subscribe((result) => {
      expect(result).toBe(usuario);
    });

    const req = http.expectOne(`${baseURL}/update/${usuario.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(usuario);
    tick();
  }));

  it('should delete an user', fakeAsync(() => {
    service.delete(usuario.id).subscribe((result) => {
      expect(result).toBe('Deletado');
    });

    const req = http.expectOne(`${baseURL}/delete/${usuario.id}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush('Deletado');
    tick();
  }));
});
