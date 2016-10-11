# README #

Welcome to ASP.net Core Angular 2 template.

Writing this README I assume that you've already generated your project using my Yeoman template. If you didn't: [check out GitHub](https://github.com/MyPCIsBetter/generator-aspnet-angular2).

### What do you need to know: ###

* `wwwroot` is treated like temporary folder. It is generated automatically and you shouldn't make any changes there.
* `src` is where you write your code. All files will go to `wwwroot` after compilation.
* `Media` is where you keep images that will be displayed on your website
* To build your project, you need to type `gulp default` in console. Keep it open and it will compile your project automatically every time you make any changes in `./src` folder
* TypeScript code compiling in Visual Studio is disabled (because I'm using gulp for that). You can change that by deleting `<TypeScriptCompileBlocked>` from `*.csproj` file

### To get started: ###
Make sure you:

* Installed all ASP.net Core dependencies `dotnet restore`
* Installed all NPM dependencies `npm install`
* Installed all Bower dependencies `bower install`
* Deployed `gulp default` task
* Created database (I've described it below)

Everything except database should be done automatically after yeoman finishes generating, but you can do it again if something doesn't work.

* To run your project type `dotnet run` in console
* Remember to always keep open console with `gulp default` task (it will automatically compile your code)

### To create database: ###
I've included Entity Framework in this template, to speed up configuring basic SQL databases.
[Here is what you should do to create database from your models](https://docs.efproject.net/en/latest/platforms/aspnetcore/new-db.html#create-your-database)
If you aren't using Visual Studio with Package Manager, you should probably use something like `dnx ef database update` (I'm not sure if it works)

### If your Angular code doesn't work as it should ###
I encountered this problem many times in Visual Studio 2015. Visual Studio sometimes automatically compiles TypeScript code to JS and put compiled `*.js` files in src folder. We don't want that, because we are compiling TypeScript using Gulp tasks.

1. Make sure you don't have any `*.js` files in `./src/app` that weren't created by you (except system.config.js. That file is OK)
2. If you do, run `gulp clean-js-from-src` (beware! It will delete all `*.js` files!)
3. Finally, run `gulp default` to rebuild your project.

### If not all necessary files are being copied from `./src` to `./wwwroot` ###

1. Go to `gulpfile.js`
2. Find `path.filesToWatch` variable
3. Make sure it includes extension of file you want to compile

### If commands like `npm`, `bower`, `gulp` doesn't work globally in your console: ###
And you can't install dependencies:

1. Add "NODE_PATH" variable to `Windows Enviroment Variables`
2. As a value type path to `node_modules` folder of global instance of NPM
3. You should be able now to use those commands in console.

[More on StackOverflow](http://stackoverflow.com/a/24042936/1804027)