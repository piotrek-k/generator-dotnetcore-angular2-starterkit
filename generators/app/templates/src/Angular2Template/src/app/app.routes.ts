import { provideRouter, RouterConfig } from '@angular/router';
import { AppComponent } from './app.component';
import { MainPageComponent } from './mainPage/mainPage.component';
import { ViewDataComponent } from './viewData/viewData.component';

// Route config let's you map routes to components
const routes: RouterConfig = [
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
    }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
