import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddossieretudComponent } from './adddossieretud.component';

describe('AdddossieretudComponent', () => {
  let component: AdddossieretudComponent;
  let fixture: ComponentFixture<AdddossieretudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddossieretudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddossieretudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
