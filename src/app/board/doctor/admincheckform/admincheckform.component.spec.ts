import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincheckformComponent } from './admincheckform.component';

describe('AdmincheckformComponent', () => {
  let component: AdmincheckformComponent;
  let fixture: ComponentFixture<AdmincheckformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincheckformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincheckformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
