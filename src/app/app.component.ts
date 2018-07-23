import {filter, map, mergeMap} from 'rxjs/operators';
import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';


import * as $ from 'jquery';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private titleService: Title,
                public auth: AuthService) {
        // Dynamic Page Titles - https://gist.github.com/katowulf/2145adce2423d1b2f984555a6c1e87fb
        this.router
            .events
            .pipe(filter(event => event instanceof NavigationEnd),
                map(() => {
                    let route = this.activatedRoute;
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route;
                }),
                filter(route => route.outlet === 'primary'),
                mergeMap(route => route.data),
                map(data => {
                    if (data.title) {
                        // If a route has a title set (e.g. data: {title: 'Foo'}) then we use it
                        return data.title;
                    }
                }))
            .subscribe(title => {
                this.titleService.setTitle(title ? title + ' | VATO Vauth Web' : 'VATO Vauth Web');
            });

        // navbar to close on navigate
        $('.navbar-nav>li>a').on('click', function () {
            $('.navbar-collapse').collapse('hide');
        });
    }
}
