import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpresionModalComponent } from './impresion-modal.component';

describe('ImpresionModalComponent', () => {
  let component: ImpresionModalComponent;
  let fixture: ComponentFixture<ImpresionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImpresionModalComponent]
    });
    fixture = TestBed.createComponent(ImpresionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
