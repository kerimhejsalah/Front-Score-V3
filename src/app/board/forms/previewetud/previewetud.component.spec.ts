import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewetudComponent } from './previewetud.component';

describe('PreviewetudComponent', () => {
  let component: PreviewetudComponent;
  let fixture: ComponentFixture<PreviewetudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewetudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewetudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
