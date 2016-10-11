import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; // ROUTER_DIRECTIVES, 
import { AccountService } from '../../shared/account.service';

class LoginModel {
    email: string;
    password: string;
}

@Component({
    selector: 'login',
    template: require("./login.component.html")
})
export class LoginComponent {
    token: string = "";
    loadingState: boolean = false;
    formModel = <LoginModel>{};

    constructor(private accountService: AccountService, private router: Router) { }

    sendLoginCredentials() {
        this.loadingState = true;
        if (this.formModel.email != "" && this.formModel.password != "") {
            this.accountService.createToken(this.formModel.email, this.formModel.password)
                .do(x => this.loadingState = false)
                .do(x => this.router.navigate(['./startPage']))
                .subscribe(response => this.token = response.access_token);
        }
    }
}