import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterOption } from 'app/global';

@Component({
    selector: 'sb-groupcards',
    templateUrl: './groupcards.component.html',
    styleUrls: ['./groupcards.component.scss'],
})
export class GroupcardsComponent {
    @Output() applyNewSelection: EventEmitter<FilterOption> = new EventEmitter<FilterOption>();
    constructor(
        public dialogRef: MatDialogRef<GroupcardsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        console.log(data.filters.tribes);
        console.log(data.filters.applications);
        console.log('The Dialog was closed');
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    select(option: FilterOption) {
        option.selected = !option.selected;
        this.applyNewSelection.emit(option);
    }
}
