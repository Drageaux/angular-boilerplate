import {Observable, of} from 'rxjs';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Configuration} from '../app.constants';
import {catchError} from 'rxjs/operators';
import {retry} from 'rxjs/internal/operators';


@Injectable()
export class BaseApiService<T> {

    private actionUrl: string;
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private endpoint: string,
                private http: HttpClient,
                private config: Configuration) {
        this.actionUrl = config.ServerWithApiUrl + endpoint + '/';
    }

    public getAll<T>(): Observable<T[]> {
        return this.http.get<T[]>(this.actionUrl)
            .pipe(
                retry(this.config.RetryCount), // retry a failed request up to 3 times
                catchError(this.handleError<T[]>('endpoint: ' + this.endpoint + ' getAll', [])) // then handle the error
            );
    }

    public getOne<T>(id: number | string): Observable<T> {
        return this.http.get<T>(this.actionUrl + id)
            .pipe(
                retry(this.config.RetryCount),
                catchError(this.handleError<T>('endpoint: ' + this.endpoint + ' getOne'))
            );
    }

    public add<T>(item: T): Observable<T> {
        return this.http.post<T>(this.actionUrl, item, this.httpOptions)
            .pipe(
                retry(this.config.RetryCount),
                catchError(this.handleError<T>('endpoint: ' + this.endpoint + ' add'))
            );
    }

    public update<T>(id: number | string, itemToUpdate: any): Observable<T> {
        return this.http.put<T>(this.actionUrl + id, itemToUpdate, this.httpOptions)
            .pipe(
                retry(this.config.RetryCount),
                catchError(this.handleError<T>('endpoint: ' + this.endpoint + ' update'))
            );
    }

    public delete<T>(id: number | string): Observable<T> {
        return this.http.delete<T>(this.actionUrl + id)
            .pipe(
                retry(this.config.RetryCount),
                catchError(this.handleError<T>('endpoint: ' + this.endpoint + ' delete'))
            );
    }


    /******************
     * ERROR HANDLING *
     ******************/
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.notifyMessage(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    protected notifyMessage(message: string) {
    }
}
