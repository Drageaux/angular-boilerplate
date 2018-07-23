import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {routing} from './app.routing';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {Configuration} from './app.constants';
import {SharedModule} from './modules/shared/shared.module';
import {LoginModule} from './modules/login/login.module';
import {HomeModule} from './modules/home/home.module';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        routing,
        // other imports here,
        SharedModule.forRoot(),
        LoginModule,
        HomeModule
    ],
    providers: [Configuration],
    bootstrap: [AppComponent]
})
export class AppModule {
}
