import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpatientComponent } from './forgotpatient.component';

describe('ForgotpatientComponent', () => {
  let component: ForgotpatientComponent;
  let fixture: ComponentFixture<ForgotpatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotpatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
