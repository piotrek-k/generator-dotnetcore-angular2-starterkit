# ASP.net Core Angular 2 Yeoman generator

> Starter kit for all who want to use ASP.net Core with Angular 2

Welcome to ASP.net Core Angular 2 template!

![](screenshot.png)

## Technical details about this generator: ##

Right now there are two templates to choose.

* Template1 is the one I've made from scratch. It's based on [tutorial from angular.io](https://angular.io/). [Details can be found here](https://github.com/piotrek-k/generator-dotnetcore-angular2-starterkit/blob/master/generators/app/templates/src/666Angular2Template666/README.md)
* Template2 is based on other yeoman generator available [here](https://github.com/aspnet/JavaScriptServices), but enhanced. I've added database and login functionality (so it functions like template1)

Personally, I recommend template2, because angular part is made there by experts ;)

### Used technologies: ###

* ASP.net Core (with WebAPI) - for backend management
* Angular 2 (RC 4) - for frontend management
* TypeScript - because it works much better with Angular than pure JS
* Gulp(template1)/Webpack(template2) - for all automation
* Bootstrap - for better appearance
* Entity Framework - for database management
* OpenIddict - authentication process

## Installation

> npm install -g generator-dotnetcore-angular2-starterkit

You'll also need [Yeoman](http://yeoman.io/)

> npm install -g yo

## What do you need to make project work

1. [ASP.net Core](https://www.microsoft.com/net/core#windows) because it's .net core project
2. [Node.JS](https://nodejs.org/en/) because it's used in building process
3. [NPM](https://www.npmjs.com/) to install yeoman and this generator
4. [Gulp](https://github.com/gulpjs/gulp) (just install it globally)
5. Node scripts like `npm`, `gulp`, `bower` need to work globally in console. [This is how you can do it.](https://github.com/piotrek-k/generator-dotnetcore-angular2-starterkit/blob/master/generators/app/templates/src/666Angular2Template666/README.md#if-commands-like-npm-bower-gulp-doesnt-work-globally-in-your-console)

## Generating new project

> yo dotnetcore-angular2-starterkit

## After installation:

For template 1: [Check out project README.](https://github.com/piotrek-k/generator-dotnetcore-angular2-starterkit/blob/master/generators/app/templates/src/666Angular2Template666/README.md) **Read this if you have any doubts, questions or problems.** You can find it in every project you generate using this template.

For template 2: check out [this GitHub page](https://github.com/aspnet/JavaScriptServices)


## Doesn't work?

You can [debug this generator](http://yeoman.io/authoring/debugging.html) by typing

> set DEBUG=yeoman:generator yo dotnetcore-angular2-starterkit

in your console. Copy error message and let me know about it by creating new issue on GitHub.

## License

Apache-2.0 © [Piotrek]()
