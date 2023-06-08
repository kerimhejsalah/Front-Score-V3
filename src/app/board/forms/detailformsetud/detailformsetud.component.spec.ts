import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailformsetudComponent } from './detailformsetud.component';

describe('DetailformsetudComponent', () => {
  let component: DetailformsetudComponent;
  let fixture: ComponentFixture<DetailformsetudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailformsetudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailformsetudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
