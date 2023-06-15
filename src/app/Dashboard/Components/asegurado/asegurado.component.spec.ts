import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseguradoComponent } from './asegurado.component';

describe('AseguradoComponent', () => {
  let component: AseguradoComponent;
  let fixture: ComponentFixture<AseguradoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AseguradoComponent]
    });
    fixture = TestBed.createComponent(AseguradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
