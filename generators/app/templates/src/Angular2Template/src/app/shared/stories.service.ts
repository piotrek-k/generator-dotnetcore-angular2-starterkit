import { Injectable } from '@angular/core';
import { Story } from './story';

@Injectable()
export class StoriesService {
    allStories: Story[] = [
        {
            content: "Some really interesting story about dog",
            timeOfAdding: new Date(2016, 8, 26),
            numberOfViews: 11
        },
        {
            content: "Even cooler story about clown",
            timeOfAdding: new Date(2016, 9, 26),
            numberOfViews: 110
        },
        {
            content: "And some not cool story",
            timeOfAdding: new Date(2016, 10, 26),
            numberOfViews: 213
        }];

    get(): Story[] {
        return this.allStories;
    }
}