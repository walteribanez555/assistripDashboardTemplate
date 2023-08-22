import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartPolizasComponent } from './shopping-cart-polizas.component';

describe('ShoppingCartPolizasComponent', () => {
  let component: ShoppingCartPolizasComponent;
  let fixture: ComponentFixture<ShoppingCartPolizasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCartPolizasComponent]
    });
    fixture = TestBed.createComponent(ShoppingCartPolizasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
