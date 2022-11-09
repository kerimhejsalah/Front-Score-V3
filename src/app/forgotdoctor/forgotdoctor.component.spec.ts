import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotdoctorComponent } from './forgotdoctor.component';

describe('ForgotdoctorComponent', () => {
  let component: ForgotdoctorComponent;
  let fixture: ComponentFixture<ForgotdoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotdoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotdoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
