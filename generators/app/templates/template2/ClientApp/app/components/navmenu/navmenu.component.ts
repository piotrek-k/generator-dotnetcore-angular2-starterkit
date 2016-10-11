import { Component } from '@angular/core';
import { AccountService } from '../../shared/account.service';

@Component({
    selector: 'nav-menu',
    template: require('./navmenu.component.html'),
    styles: [require('./navmenu.component.css')]
})
export class NavMenuComponent {
    constructor(private accountService: AccountService) { }
}
