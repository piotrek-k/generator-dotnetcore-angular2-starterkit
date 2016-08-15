import { Injectable } from '@angular/core';
import { <%=name%> } from './<%= nameLowerCase %>';

@Injectable()
export class <%=name%>Service {
    <%=name%>Container: <%=name %>[] = [
        {
            exampleVariable: "hello!"
        }];

    get(): <%=name%>[] {
        return this.<%=name%>Container;
    }
}