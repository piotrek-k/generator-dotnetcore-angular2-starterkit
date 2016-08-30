///<reference path="./../../typings/index.d.ts"/>

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';

import { HttpModule, JsonpModule } from '@angular/http';

import { MainPageComponent } from './mainPage/mainPage.component';
import { ViewDataComponent } from './viewData/viewData.component';
import { RegisterComponent } from './account/register.component';
import { LoginComponent } from './account/login.component';

import { AccountService } from './shared/account.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        routing
    ], //the other modules that export material we need in this module
    declarations: [AppComponent, MainPageComponent, ViewDataComponent, RegisterComponent, LoginComponent], //components and directives that belong to this module
    bootstrap: [AppComponent], //identifies the root component that Angular should bootstrap when it starts the application
    providers: [AccountService],
})
export class AppModule { }