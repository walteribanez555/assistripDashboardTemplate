import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCotizarComponent } from './cotizar.component';

describe('CotizarComponent', () => {
  let component: HomeCotizarComponent;
  let fixture: ComponentFixture<HomeCotizarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCotizarComponent]
    });
    fixture = TestBed.createComponent(HomeCotizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
