import { Injectable } from '@angular/core';

@Injectable()
export class <%=name%>Service {
    get(): <%=name%>[] {
        return this.<%=name%>Container;
    }
}