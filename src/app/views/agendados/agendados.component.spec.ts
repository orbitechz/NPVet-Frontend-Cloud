import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendadosComponent } from './agendados.component';

describe('AgendadosComponent', () => {
  let component: AgendadosComponent;
  let fixture: ComponentFixture<AgendadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendadosComponent]
    });
    fixture = TestBed.createComponent(AgendadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
