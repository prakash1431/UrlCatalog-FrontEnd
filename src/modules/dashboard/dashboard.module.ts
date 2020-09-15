/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker/';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { TablesModule } from '@modules/tables/tables.module';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';

/* Components */
import * as dashboardComponents from './components';

import { AddcardsComponent } from './components/addcards/addcards.component';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import * as dashboardGuards from './guards';

/* Services */
import * as dashboardServices from './services';
import { FiltercardsComponent } from './components/filtercards/filtercards.component';
import { GroupcardsComponent } from './components';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        TablesModule,
        MatDialogModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatDatepickerModule,
        MatChipsModule,
        MatInputModule,
        MatSelectModule,
        MatExpansionModule,
    ],
    providers: [...dashboardServices.services, ...dashboardGuards.guards],
    declarations: [...dashboardContainers.containers, ...dashboardComponents.components],
    exports: [...dashboardContainers.containers, ...dashboardComponents.components],
    entryComponents: [AddcardsComponent, GroupcardsComponent, FiltercardsComponent],
})
export class DashboardModule {}
