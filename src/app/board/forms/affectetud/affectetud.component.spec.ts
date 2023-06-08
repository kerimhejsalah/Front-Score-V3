import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectetudComponent } from './affectetud.component';

describe('AffectetudComponent', () => {
  let component: AffectetudComponent;
  let fixture: ComponentFixture<AffectetudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectetudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectetudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
