import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFormsEtudsComponent } from './new-forms-etuds.component';

describe('NewFormsEtudsComponent', () => {
  let component: NewFormsEtudsComponent;
  let fixture: ComponentFixture<NewFormsEtudsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFormsEtudsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFormsEtudsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
