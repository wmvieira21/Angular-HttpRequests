import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { PostModel } from './post.model';
import { Observable, Subject, throwError } from 'rxjs';


@Injectable({ providedIn: 'root' })

export class PostService {

    private urlBackEnd = 'https://angularhttprequest-2d9b8-default-rtdb.firebaseio.com/posts.json';
    errorSub = new Subject<string>();

    constructor(private http: HttpClient) { }

    /*Another way of handling with error would be with a subject (errorSub)*/
    onSendPostService(formData: PostModel) {
        this.http.post<{ name: string }>(this.urlBackEnd, formData, {

            /*observe: Alter the form that we'll receive the response (body,response,events)*/
            observe: 'response'
        }).subscribe({
            next: (response) => {
                console.log(response);
            },
            error: (error) => {
                this.errorSub.next(error.message);
            }
        });
    }

    /* headers: new HttpHeaders({ 'Custom-Head': 'hello' }),
    params: new HttpParams().set('print', 'pretty'),
    responseType: 'json'
        
     They're all optinal. 
     Headers alter the header information in the httmlrequest
    responseType: json, text or blob (arquivo). Defatul json
     */
    onFeatchPosts() {
        return this.http.get<{ [key: string]: PostModel }>(this.urlBackEnd,
            {
                headers: new HttpHeaders({ 'Custom-Head': 'hello' }),
                params: new HttpParams().set('print', 'pretty'),
                responseType: 'json'
            })
            .pipe(catchError((error) => {
                return throwError(() => new Error('erro service onFeatchPosts'));

            }), map((responseData) => {
                let responseTreated: PostModel[] = [];

                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        responseTreated.push({ ...responseData[key], id: key });
                    }
                }
                return responseTreated;
            })
            )
    }

    onClearPost() {
        return this.http.delete(this.urlBackEnd, {
            observe: 'events'
        }).pipe(tap((event) => {
            /*Tap doesn't alter the result/response. It's just used when you wanna to run some code. 
            Example, infor the user that the request was sent and we're waiting for the responde*/
            //console.log(event);
            if (event.type == HttpEventType.Response) {
                console.log(event);
            } else if (event.type == HttpEventType.Sent) {
                console.log('Request sent');
            }
        }));
    }
}