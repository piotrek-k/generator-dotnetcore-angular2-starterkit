import { Component } from '@angular/core';
//import { ROUTER_DIRECTIVES } from '@angular/router';
import { AccountService } from './shared/account.service';
import { FormBuilder } from '@angular/forms';

import './rxjs-operators';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html', 
    styleUrls: ['app/app.component.css'],
    //directives: [ROUTER_DIRECTIVES],
    providers: [FormBuilder]
})
export class AppComponent {
    constructor(private accountService: AccountService) { }
}
