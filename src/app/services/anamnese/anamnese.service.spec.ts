import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AnamneseService } from './anamnese.service';

describe('AnamneseService', () => {
  let service: AnamneseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
});
    service = TestBed.inject(AnamneseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
