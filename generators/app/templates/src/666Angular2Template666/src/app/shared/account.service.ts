import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountService {
    constructor(private http: Http) {
        this.tokenCheck();
    }

    private registerURL = "api/Account/Register";
    private loginURL = "api/Account/Login";

    private storageTokenKey = "access_token";
    private storageExpirationDate = "access_token_expiration";
    private storageUserName = "token_username";

    public isLoggedIn = false;

    //get token expiration from memory
    tokenExpirationDate(): Date {
        return new Date(parseInt(localStorage.getItem(this.storageExpirationDate)));
    }

    //get token from memory
    getToken(): string {
        if (this.tokenCheck()) {
            return localStorage.getItem(this.storageTokenKey);
        }
        else {
            //TODO: user is logged out, do something
            return undefined;
        }
    }

    //true if token hasn't expired
    tokenCheck(): boolean {
        if (localStorage.getItem(this.storageTokenKey) != undefined) {
            //token found in storage
            if (this.tokenExpirationDate().getTime() > new Date().getTime()) {
                //hasn't expired yet
                this.isLoggedIn = true;
            }
            else {
                //expired, delete it
                localStorage.removeItem(this.storageTokenKey);
                localStorage.removeItem(this.storageExpirationDate);
                this.isLoggedIn = false;
            }
        }
        else {
            //token not present
            this.isLoggedIn = false;
        }
        return this.isLoggedIn;
    }

    getUserName(): string {
        return localStorage.getItem(this.storageUserName);
    }

    //login to application
    createToken(email: string, password: string): Observable<any> {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        let data = 'username=' + email + '&password=' + password + '&grant_type=password&scope=openid profile email phone';
        return this.http.post(this.loginURL, data, { headers: headers })
            .map(response => response.json())
            .do(
            response => {
                let idToken = response.id_token;

                let tokenData = this.parseJwt(idToken);

                let expiresIn = parseInt(response.expires_in); //in seconds
                let newDate = new Date(new Date().getTime() + (1000 * expiresIn)); //date of expiration
                
                console.log("Expiration Date: " + newDate);
                console.log("Token: " + response.access_token);

                localStorage.setItem(this.storageUserName, tokenData.unique_name);
                localStorage.setItem(this.storageTokenKey, response.access_token);
                localStorage.setItem(this.storageExpirationDate, newDate.getTime() + "");

                this.isLoggedIn = true;
            },
            error => {
                console.log(error.text());
            });
    }

    //register to application. Data must be validated at this point!
    registerAccount(email: string, password: string, confirmPassword: string): Observable<any> {
        let form = { email: email, password: password, confirmPassword: confirmPassword };

        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('/api/Account/Register', JSON.stringify(form), { headers: headers })
            .do(result => {
                console.log(result.toString());
            });
    }

    logOut() {
        localStorage.removeItem(this.storageTokenKey);
        this.isLoggedIn = false;
    }

    parseJwt(token: string): any {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

}