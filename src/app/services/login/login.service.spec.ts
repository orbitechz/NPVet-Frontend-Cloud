import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginService } from './login.service';
import { Login } from 'src/app/models/login/login';
import { Usuario } from 'src/app/models/usuario/usuario';
import { Role } from 'src/app/models/enums/role';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate the user', () => {
    const login: Login = { username: "username", password: "123" };
    const expectedUser: Usuario = {
      id: 1,
      username: 'sampleUsername',
      role: Role.ADMINISTRADOR,
      token: 'sampleToken',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
      nome: 'test',
      cpf: 'test',
      senha: '123'
    };
    spyOn(service['http'], 'post').and.returnValue(of(expectedUser));

    service.login(login).subscribe(user => {
      expect(user).toEqual(expectedUser);
    });
  });

  it('should log out the user', () => {
    spyOn(service['http'], 'get').and.returnValue(of({}));
  
    service.logout().subscribe(response => {
      expect(response).toEqual({});
    });
  });
});
