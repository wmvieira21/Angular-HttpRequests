import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('request is on its way');
        console.log(req);

        /*Altering the headers of the current request*/
        const modifiedRequest = req.clone({ headers: req.headers.append('Auth', 'xyz') });

        console.log(modifiedRequest);
        return next.handle(modifiedRequest);
    }
}