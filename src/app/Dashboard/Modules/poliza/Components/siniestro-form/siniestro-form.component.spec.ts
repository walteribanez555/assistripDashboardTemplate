import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiniestroFormComponent } from './siniestro-form.component';

describe('SiniestroFormComponent', () => {
  let component: SiniestroFormComponent;
  let fixture: ComponentFixture<SiniestroFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiniestroFormComponent]
    });
    fixture = TestBed.createComponent(SiniestroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
