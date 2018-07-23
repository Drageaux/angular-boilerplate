import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found.component';
import {AuthGuard} from './services/auth.guard';
import {LoginComponent} from './modules/login/login.component';
import {HomeComponent} from './modules/home/home.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'login', component: LoginComponent, data: {title: 'Login'}},
    {path: 'home', component: HomeComponent, data: {title: 'Home'}, canActivate: [AuthGuard]},
    {path: '**', component: PageNotFoundComponent} // don't define any route after this line!
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes, {useHash: true});
