import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './mainPage/mainPage.component';
import { ViewDataComponent } from './viewData/viewData.component';
import { RegisterComponent } from './account/register.component';
import { LoginComponent } from './account/login.component';

const appRoutes: Routes = [
    {
        path: 'startPage',
        component: MainPageComponent
    },
    {
        path: 'data',
        component: ViewDataComponent
    },
    {
        path: '',
        redirectTo: '/startPage',
        pathMatch: 'full'
    },
    {
        path: 'account/register',
        component: RegisterComponent
    },
    {
        path: 'account/login',
        component: LoginComponent
    }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);