import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolizaDataComponent } from './poliza-data.component';

describe('PolizaDataComponent', () => {
  let component: PolizaDataComponent;
  let fixture: ComponentFixture<PolizaDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolizaDataComponent]
    });
    fixture = TestBed.createComponent(PolizaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
