import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiniestrosComponent } from './siniestros.component';

describe('SiniestrosComponent', () => {
  let component: SiniestrosComponent;
  let fixture: ComponentFixture<SiniestrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiniestrosComponent]
    });
    fixture = TestBed.createComponent(SiniestrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
