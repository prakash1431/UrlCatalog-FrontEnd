import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Global } from 'app/global';
@Component({
    selector: 'sb-dashboard-tables',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-tables.component.html',
    styleUrls: ['dashboard-tables.component.scss'],
})
export class DashboardTablesComponent implements OnInit {
    isAdmin = false;
    constructor() {}
    ngOnInit() {
        this.isAdmin = false;
        if (Global.userrole === 'Administrator') {
            this.isAdmin = true;
        }
    }
}
