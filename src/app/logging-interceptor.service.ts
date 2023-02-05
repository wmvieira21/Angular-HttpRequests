import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs';

export class LoggingInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Outgoing request');
        console.log(req);
        
        return next.handle(req).pipe(tap(event => {
            /*.pipe optional, but useful if you wanna check the response*/
            if (event.type === HttpEventType.Response) {
                console.log('Incoming request');
                console.log(req);
                console.log(event.body);
            }
        }));
    }
}