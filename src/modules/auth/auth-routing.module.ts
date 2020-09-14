/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { AuthModule } from './auth.module';

/* Containers */
import * as authContainers from './containers';

/* Guards */
import * as authGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'home'
    },
    {
        path: 'home',
        canActivate: [],
        component: authContainers.HomeComponent,
        data: {
            title: 'Home Page',
        } as SBRouteData,
    },
    {
        path: 'login',
        canActivate: [],
        component: authContainers.LoginComponent,
        data: {
            title: 'Pages Login - Url Catalog',
        } as SBRouteData,
    },
    {
        path: 'register',
        canActivate: [],
        component: authContainers.RegisterComponent,
        data: {
            title: 'Pages Register - Url Catalog Angular',
        } as SBRouteData,
    },
];

@NgModule({
    imports: [AuthModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
