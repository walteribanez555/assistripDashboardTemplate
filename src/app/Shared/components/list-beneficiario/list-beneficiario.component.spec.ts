import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBeneficiarioComponent } from './list-beneficiario.component';

describe('ListBeneficiarioComponent', () => {
  let component: ListBeneficiarioComponent;
  let fixture: ComponentFixture<ListBeneficiarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBeneficiarioComponent]
    });
    fixture = TestBed.createComponent(ListBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
