import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlcatalogComponent } from './urlcatalog.component';

describe('UrlcatalogComponent', () => {
  let component: UrlcatalogComponent;
  let fixture: ComponentFixture<UrlcatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlcatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlcatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
