import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacinaDetailsComponent } from './vacina-details.component';

describe('VacinaDetailsComponent', () => {
  let component: VacinaDetailsComponent;
  let fixture: ComponentFixture<VacinaDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacinaDetailsComponent]
    });
    fixture = TestBed.createComponent(VacinaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
