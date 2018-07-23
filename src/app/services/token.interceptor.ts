import {from, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.setToken(req, next));
    }

    private async setToken(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
        const token = await null; // await firebase.auth().currentUser.getIdToken();

        // HttpHeader objects are apparently immutable, so we clone
        // (reference: https://www.illucit.com/en/angular/angular-5-httpinterceptor-add-bearer-token-to-httpclient-requests/)
        const customReq = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`)
        });
        // pass on the modified request object
        return next.handle(customReq).toPromise();
    }
}
