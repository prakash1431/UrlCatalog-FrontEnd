/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { DashboardModule } from './dashboard.module';

/* Containers */
import * as dashboardContainers from './containers';

import * as dashboardComponents from './components';

/* Guards */
import * as dashboardGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Dashboard - Url Catalog Angular',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: dashboardContainers.DashboardComponent,
    },
    {
        path: 'urlcatalog',
        canActivate: [],
        component: dashboardContainers.UrlcatalogComponent,
        data: {
            title: 'All active cards',
        } as SBRouteData,
    },
];

@NgModule({
    imports: [DashboardModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
