import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Global } from 'app/global';

import { AddcardsComponent } from '../addcards/addcards.component';

@Component({
    selector: 'sb-dashboard-cards',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-cards.component.html',
    styleUrls: ['dashboard-cards.component.scss'],
})
export class DashboardCardsComponent implements OnInit {
    constructor(public dialog: MatDialog, private router: Router) {}
    isAdmin = false;
    ngOnInit() {
        if (Global.userrole === 'Administrator') {
            this.isAdmin = true;
        }
    }
    addnewcard() {
        this.dialog.open(AddcardsComponent, {
            data: {
                message: 'Error!!!',
            },
            disableClose: true,
            height: '350px',
        });
    }
    proceedallcards() {
        this.router.navigate(['/dashboard/urlcatalog']);
    }
}
