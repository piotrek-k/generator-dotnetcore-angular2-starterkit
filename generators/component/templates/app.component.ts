import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
//import { StoriesService } from './shared/stories.service';

@Component({
    moduleId: module.id,
    selector: '<%=nameLowerCase%>',
    templateUrl: '<%=nameLowerCase%>.component.html', 
    styleUrls: ['<%=nameLowerCase%>.component.css'],
    directives: [ROUTER_DIRECTIVES],
    //providers: [StoriesService]
})
export class <%=nameCamelCase%>Component {
    this.title = "<%=nameCamelCase%>Component";
    constructor(/*private storiesService: StoriesService*/) { }
}
