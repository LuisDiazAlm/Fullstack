import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable()
export class BasepathInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let lang = 'es';
        const requestWithBasepath = request.clone({
            url: `${URL_SERVICIOS}${request.url}`
        });
        return next.handle(requestWithBasepath);
    }
}
