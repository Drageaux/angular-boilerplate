import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
/**
 * Singleton service that has 1 shared instance across modules
 */
export class AuthService {

    // TODO: use real auth methods
    private authed: boolean;
    private admin: boolean;

    constructor(private router: Router) {
        this.getLocalStorage();
    }

    getLocalStorage() {
        this.authed = JSON.parse(localStorage.getItem('authed'));
        this.admin = JSON.parse(localStorage.getItem('admin'));
    }

    authenticated(): boolean {
        this.getLocalStorage();
        return this.authed === true;
    }

    isAdmin(): boolean {
        this.getLocalStorage();
        return this.admin === true;
    }

    login(): void {
        localStorage.setItem('authed', 'true');
        this.getLocalStorage();
        this.router.navigate(['/']);
        return;
    }

    logout(): void {
        localStorage.removeItem('authed');
        this.getLocalStorage();
        this.router.navigate(['/login']);
        return;
    }
}
