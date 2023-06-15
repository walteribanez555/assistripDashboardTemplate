import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeFormComponent } from './mensaje-form.component';

describe('MensajeFormComponent', () => {
  let component: MensajeFormComponent;
  let fixture: ComponentFixture<MensajeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MensajeFormComponent]
    });
    fixture = TestBed.createComponent(MensajeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
