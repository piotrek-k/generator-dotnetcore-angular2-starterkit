import { Component } from '@angular/core';
//import { ROUTER_DIRECTIVES } from '@angular/router';
import { StoriesService } from '../shared/stories.service';

@Component({
    selector: 'mainpage-component',
    //directives: [ROUTER_DIRECTIVES],
    templateUrl: "app/mainPage/mainPage.component.html",
})
export class MainPageComponent {
    title: string = "Welcome to new Angular2 app";
}