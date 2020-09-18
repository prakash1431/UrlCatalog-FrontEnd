import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Global } from 'app/global';

@Component({
    selector: 'sb-tables',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './tables.component.html',
    styleUrls: ['tables.component.scss'],
})
export class TablesComponent implements OnInit {
    isAdmin = false;
    constructor() {}
    ngOnInit() {
        if (Global.userrole === 'Administrator') {
            this.isAdmin = true;
        }
    }
}
