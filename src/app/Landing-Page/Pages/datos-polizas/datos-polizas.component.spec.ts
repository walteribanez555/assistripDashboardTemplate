import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPolizasComponent } from './datos-polizas.component';

describe('DatosPolizasComponent', () => {
  let component: DatosPolizasComponent;
  let fixture: ComponentFixture<DatosPolizasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosPolizasComponent]
    });
    fixture = TestBed.createComponent(DatosPolizasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
