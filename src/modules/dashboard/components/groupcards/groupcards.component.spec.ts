import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupcardsComponent } from './groupcards.component';

describe('GroupcardsComponent', () => {
  let component: GroupcardsComponent;
  let fixture: ComponentFixture<GroupcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
