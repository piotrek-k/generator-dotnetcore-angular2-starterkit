import { Component, OnInit } from '@angular/core';
//import { ROUTER_DIRECTIVES } from '@angular/router';
import { StoriesService } from '../shared/stories.service';
import { Story } from '../shared/story';

@Component({
    moduleId: module.id,
    //directives: [ROUTER_DIRECTIVES],
    templateUrl: "viewData.component.html",
    providers: [StoriesService]
})
export class ViewDataComponent implements OnInit {
    title: string = "ViewDataComponent";
    errorMessage: string;
    selectedOption: any;
    stories: Story[];
    storiesFromDb: Story[];

    constructor(private storiesService: StoriesService) { }

    ngOnInit() { this.getStories(); this.getStoriesFromDB(); }

    getStories() {
        this.storiesService.get().subscribe(stories => this.stories = stories, error => this.errorMessage = <any>error);
    }

    getStoriesFromDB() {
        this.storiesService.getDB().subscribe(stories => this.storiesFromDb = stories, error => this.errorMessage = <any>error);
    }

    addStory(content: string) {
        if (!content) { return; }
        this.storiesService.add(content)
            .subscribe(
            story => this.getStories(),
            error => this.errorMessage = <any>error);
    }

    addStoryToDB(content: string) {
        if (!content) { return; }
        this.storiesService.addDB(content)
            .subscribe(
            story => this.getStoriesFromDB(),
            error => this.errorMessage = <any>error);
    }
}