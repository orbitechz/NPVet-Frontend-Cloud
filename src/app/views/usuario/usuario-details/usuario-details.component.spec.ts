import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UsuarioDetailsComponent } from './usuario-details.component';
import { FormsModule } from '@angular/forms';

describe('UsuarioDetailsComponent', () => {
  let component: UsuarioDetailsComponent;
  let fixture: ComponentFixture<UsuarioDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule], 
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

      declarations: [UsuarioDetailsComponent]
    });
    fixture = TestBed.createComponent(UsuarioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
