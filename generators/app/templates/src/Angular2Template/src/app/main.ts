///<reference path="./../../typings/globals/core-js/index.d.ts"/>
import { bootstrap }    from "@angular/platform-browser-dynamic";
import { disableDeprecatedForms, provideForms } from "@angular/forms";
import { APP_ROUTER_PROVIDERS } from "./app.routes";
import { HTTP_PROVIDERS } from "@angular/http";
import { AppComponent } from "./app.component";

bootstrap(AppComponent, [
    APP_ROUTER_PROVIDERS,         // Routing Config!
    HTTP_PROVIDERS,               // Http
    disableDeprecatedForms(),     // Disable old Forms API!
    provideForms()                // Use new Forms API!
])
    .catch((err: any) => console.error(err));
