import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { StoriesService } from '../shared/stories.service';
import { Story } from '../shared/story';

@Component({
    directives: [ROUTER_DIRECTIVES],
    templateUrl: "app/viewData/viewData.component.html",
})
export class ViewDataComponent {
    title: string = "ViewDataComponent";
    selectedOption: any;

    constructor(private storiesService: StoriesService) { }
}