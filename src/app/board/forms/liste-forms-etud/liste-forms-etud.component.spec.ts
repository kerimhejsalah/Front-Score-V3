import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFormsEtudComponent } from './liste-forms-etud.component';

describe('ListeFormsEtudComponent', () => {
  let component: ListeFormsEtudComponent;
  let fixture: ComponentFixture<ListeFormsEtudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeFormsEtudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFormsEtudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
