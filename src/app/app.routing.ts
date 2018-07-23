import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found.component';
import {AuthGuard} from './services/auth.guard';
import {LoginComponent} from './modules/login/login.component';
import {HomeComponent} from './modules/home/home.component';
import {UsersComponent} from './modules/users/users.component';
import {ApplicationsComponent} from './modules/applications/applications.component';
import {AppDetailsComponent} from './modules/applications/app-details/app-details.component';
import {AppNewComponent} from './modules/applications/app-new/app-new.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'login', component: LoginComponent, data: {title: 'Login'}},
    {path: 'home', component: HomeComponent, data: {title: 'Home'}, canActivate: [AuthGuard]},
    {path: 'users', component: UsersComponent, data: {title: 'Manage Users'}, canActivate: [AuthGuard]},
    {
        path: 'apps',
        data: {title: 'Manage Applications'},
        children: [{
            path: '',
            component: ApplicationsComponent
        }, {
            path: 'new',
            component: AppNewComponent,
            data: {title: 'Create a New App'}
        }, {
            path: 'details/:id',
            component: AppDetailsComponent,
            data: {title: 'Application Details'}
        }],
        canActivate: [AuthGuard]
    },
    {path: '**', component: PageNotFoundComponent} // don't define any route after this line!
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes, {useHash: true});
