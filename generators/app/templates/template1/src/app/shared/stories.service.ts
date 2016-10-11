import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Story } from './story';
import { Observable } from 'rxjs/Observable';
//Other important features come from rxjs-operators.ts file

@Injectable()
export class StoriesService {
    constructor(private http: Http) { }

    private storiesURL = 'api/stories';  // URL to web API
    private storiesURLfromDB = 'api/storiesFromDb';  // URL to web API that uses Database
    
    get(): Observable<Story[]> {
        //return this.allStories;
        return this.http.get(this.storiesURL).map(this.extractData).catch(this.handleError);
    }

    add(content: string): Observable<Story> {
        let body = JSON.stringify({ content: content });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers});

        return this.http.post(this.storiesURL, body, options).catch(this.handleError);
            //.map(this.extractData) //no data to extract
    }

    getDB(): Observable<Story[]> {
        //return this.allStories;
        return this.http.get(this.storiesURLfromDB).map(this.extractData).catch(this.handleError);
    }

    addDB(content: string): Observable<Story> {
        let body = JSON.stringify({ content: content });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.storiesURLfromDB, body, options).catch(this.handleError);
        //.map(this.extractData) //no data to extract
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}