import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDossierAffectComponent } from './form-dossier-affect.component';

describe('FormDossierAffectComponent', () => {
  let component: FormDossierAffectComponent;
  let fixture: ComponentFixture<FormDossierAffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDossierAffectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDossierAffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
