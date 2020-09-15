import { Platform } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Tribes } from 'app/global';
import { FeatureTeam } from 'app/global';
import { Application } from 'app/global';

@Component({
    selector: 'sb-addcards',
    templateUrl: './addcards.component.html',
    styleUrls: ['./addcards.component.scss'],
})
export class AddcardsComponent implements OnInit {
    keys = Object.keys;
    tribes = Tribes;
    teams = FeatureTeam;
    apps = Application;
    constructor(public dialogRef: MatDialogRef<AddcardsComponent>) {}

    ngOnInit(): void {}

    save() {}

    cancel() {
        this.dialogRef.close();
    }
}
