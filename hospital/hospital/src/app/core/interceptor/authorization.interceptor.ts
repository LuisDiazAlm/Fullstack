import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TOKEN } from 'src/app/config/config';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
    suscriptionSumary: any;
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request.clone({
            setParams: {
                'token': TOKEN
            }
        }));
    }
}
