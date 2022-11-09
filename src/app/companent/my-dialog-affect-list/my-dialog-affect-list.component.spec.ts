import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDialogAffectListComponent } from './my-dialog-affect-list.component';

describe('MyDialogAffectListComponent', () => {
  let component: MyDialogAffectListComponent;
  let fixture: ComponentFixture<MyDialogAffectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDialogAffectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDialogAffectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
