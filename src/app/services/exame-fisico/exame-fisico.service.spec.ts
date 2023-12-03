import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ExameFisicoService } from './exame-fisico.service';

describe('ExameFisicoService', () => {
  let service: ExameFisicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({      
      imports: [HttpClientTestingModule], 
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

    });
    service = TestBed.inject(ExameFisicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
