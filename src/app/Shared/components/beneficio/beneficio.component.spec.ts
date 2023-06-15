import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficioComponent } from './beneficio.component';

describe('BeneficioComponent', () => {
  let component: BeneficioComponent;
  let fixture: ComponentFixture<BeneficioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeneficioComponent]
    });
    fixture = TestBed.createComponent(BeneficioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
