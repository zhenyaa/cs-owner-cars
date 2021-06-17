import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnderListComponent } from './ownder-list.component';

describe('OwnderListComponent', () => {
  let component: OwnderListComponent;
  let fixture: ComponentFixture<OwnderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
