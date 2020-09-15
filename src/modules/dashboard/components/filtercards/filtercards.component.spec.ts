import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { filtercardsComponent } from './filtercards.component';

describe('filtercardsComponent', () => {
  let component: filtercardsComponent;
  let fixture: ComponentFixture<filtercardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ filtercardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(filtercardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
