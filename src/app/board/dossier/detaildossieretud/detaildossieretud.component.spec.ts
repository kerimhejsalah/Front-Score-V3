import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaildossieretudComponent } from './detaildossieretud.component';

describe('DetaildossieretudComponent', () => {
  let component: DetaildossieretudComponent;
  let fixture: ComponentFixture<DetaildossieretudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaildossieretudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaildossieretudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
