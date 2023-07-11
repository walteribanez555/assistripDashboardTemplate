import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuPolizaComponent } from './tu-poliza.component';

describe('TuPolizaComponent', () => {
  let component: TuPolizaComponent;
  let fixture: ComponentFixture<TuPolizaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TuPolizaComponent]
    });
    fixture = TestBed.createComponent(TuPolizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
