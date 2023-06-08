import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdossieretudComponent } from './listdossieretud.component';

describe('ListdossieretudComponent', () => {
  let component: ListdossieretudComponent;
  let fixture: ComponentFixture<ListdossieretudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListdossieretudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdossieretudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
