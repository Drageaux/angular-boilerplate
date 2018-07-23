import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private router: Router,
                public auth: AuthService) {
    }

    ngOnInit() {
        if (this.auth.authenticated()) {
            this.router.navigate(['/']);
        }
    }

    login() {
        this.auth.login();
    }
}
