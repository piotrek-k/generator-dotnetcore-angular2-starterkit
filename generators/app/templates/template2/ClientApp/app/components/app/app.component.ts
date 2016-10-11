import { Component } from '@angular/core';
import '../../../rxjs-operators';
import { AccountService } from '../../shared/account.service';

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    styles: [require('./app.component.css')]
})
export class AppComponent {
    constructor(private accountService: AccountService) { }
}
