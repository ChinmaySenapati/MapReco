import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpEventType.Response>> {
        if (req.url.indexOf('authenticate/user') == -1) {
            let user = JSON.parse(localStorage.getItem('user'));
            if (user != null) {
                let authToken = user.auth_token;
                let headers = new HttpHeaders();
                headers = headers.set('Authorization', 'Bearer ' + authToken);
                req = req.clone({ headers });
            }
        }

        return next.handle(req); 
    }
}