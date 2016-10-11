import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'database',
    template: require('./database.component.html')
})
export class DatabaseComponent implements OnInit {
    public stories: Story[];

    constructor(http: Http) {
        http.get('api/storiesFromDb').subscribe(result => {
            this.stories = result.json();
        });
    }

    ngOnInit() { }
}

interface Story {
    content: string;
    timeOfAdding: Date;
    numberOfViews: number;
}