import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSiniestroComponent } from './data-siniestro.component';

describe('DataSiniestroComponent', () => {
  let component: DataSiniestroComponent;
  let fixture: ComponentFixture<DataSiniestroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataSiniestroComponent]
    });
    fixture = TestBed.createComponent(DataSiniestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
