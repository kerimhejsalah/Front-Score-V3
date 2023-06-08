import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormpreviewetudComponent } from './formpreviewetud.component';

describe('FormpreviewetudComponent', () => {
  let component: FormpreviewetudComponent;
  let fixture: ComponentFixture<FormpreviewetudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormpreviewetudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormpreviewetudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
