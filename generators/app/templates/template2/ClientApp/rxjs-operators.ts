//RxJS is big library, so it's better to load only those features we actually need.
//Read more: https://angular.io/docs/ts/latest/guide/server-communication.html#!#http-client

//To load all RxJS features:
// import 'rxjs/Rx'; // adds ALL RxJS statics & operators to Observable

// This file is loaded in app.component.ts

// Importing just the rxjs statics and operators we need for THIS app:

// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';