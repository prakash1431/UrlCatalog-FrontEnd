import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddcardsComponent } from '../addcards/addcards.component';

@Component({
    selector: 'sb-dashboard-cards',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-cards.component.html',
    styleUrls: ['dashboard-cards.component.scss'],
})
export class DashboardCardsComponent implements OnInit {
    constructor(public dialog: MatDialog, private router: Router) {}
    ngOnInit() {}
    addnewcard() {
        this.dialog.open(AddcardsComponent, {
            data: {
                message: 'Error!!!',
            },
            disableClose: true,
        });
    }
    proceedallcards() {
        this.router.navigate(['dashboard/filtercards']);
    }
}
