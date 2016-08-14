import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { StoriesService } from './shared/stories.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html', 
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [StoriesService]
})
export class AppComponent {
    constructor(private storiesService: StoriesService) { }
}
