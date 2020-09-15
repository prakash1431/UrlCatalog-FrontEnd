import {COMMA, ENTER} from '@angular/cdk/keycodes'
import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterOption,FilterType } from 'app/global';
import { GroupcardsComponent } from '../groupcards/groupcards.component';
import {Filters} from './Filters';

@Component({
    selector: 'sb-filtercards',
    templateUrl: './filtercards.component.html',
    styleUrls: ['./filtercards.component.scss'],
})
export class FiltercardsComponent implements OnInit {
    @Output() apply: EventEmitter<FilterOption[]> = new EventEmitter<FilterOption[]>();
    @Input() objectsListLength!: number;
    @Input()
    filteredObjectsListLength!: number;
    public addOnBlur = true;
    public seperatorKeysCodes = [ENTER, COMMA];
    public filters: Filters = new Filters();
    constructor(private router: Router, private dialog: MatDialog, private route: ActivatedRoute) {}

    ngOnInit(){
        this.route.queryParams.subscribe(params => {
            this.filters.parseRouterParameters(params);
            this.resetDefaultFilters();
        }).unsubscribe();
    }

    openDailog() {
        const dialogRef = this.dialog.open(GroupcardsComponent, {
            data: {
                filters :this.filters
            },
            disableClose: true 
        });

        dialogRef.afterClosed().subscribe(result =>{
            console.log('The Dialog was closed');
        });

        dialogRef.componentInstance.applyNewSelection.subscribe(
            option => this.addOption(option));
    }
    

    private addOption(option : FilterOption)
    {
        this.filters.addFilter(option);
        this.filtersChanged(true);
    }
    resetDefaultFilters() {}

    select(option : FilterOption)
    {
        option.selected = !option.selected;
        this.filtersChanged(true);
    }

    public filtersChanged(shouldUpdateQueryParams=false)
    {
        this.filters.computeDescription();
        this.apply.emit(this.filters.visibleFilterOptions);
        if(shouldUpdateQueryParams){
            this.updateQueryParams();
        }
    }

    private updateQueryParams(){
        this.router.navigate([],{relativeTo:this.route, queryParams:{filters:this.filters.getAsQueryParams()}});
    }

    public add(event: MatChipInputEvent) : void {
        const input = event.input;
        const value = (event.value || '').replace(/\s+/g,'')
        if(value.length === 0){

        }
        this.filters.addFilterFromKey(value);

        this.filtersChanged(true);

        if(input){
            input.value = '';
        }
        }

        remove(option: FilterOption):void{
            if(this.filters.remove(option)){
                this.filtersChanged(true);
            }
        }
}
