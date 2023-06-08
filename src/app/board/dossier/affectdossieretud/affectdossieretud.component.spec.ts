import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectdossieretudComponent } from './affectdossieretud.component';

describe('AffectdossieretudComponent', () => {
  let component: AffectdossieretudComponent;
  let fixture: ComponentFixture<AffectdossieretudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectdossieretudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectdossieretudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
