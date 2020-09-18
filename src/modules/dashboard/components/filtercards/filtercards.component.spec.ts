import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltercardsComponent } from './filtercards.component';

describe('filtercardsComponent', () => {
    let component: FiltercardsComponent;
    let fixture: ComponentFixture<FiltercardsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FiltercardsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FiltercardsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
