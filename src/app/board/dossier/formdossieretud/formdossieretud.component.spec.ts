import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdossieretudComponent } from './formdossieretud.component';

describe('FormdossieretudComponent', () => {
  let component: FormdossieretudComponent;
  let fixture: ComponentFixture<FormdossieretudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormdossieretudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormdossieretudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
