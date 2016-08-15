# README #

Welcome to ASP.net Core Angular 2 template.

### What do you need to know: ###

1. `wwwroot` is treated like temporary folder. It is generated automatically and you shouldn't make any changes there.
2. `src` is where you write your code. All files will go to `wwwroot` after compilation.
3. To build your project, you need to type `gulp default` in console. Keep it open and it will compile your project automatically every time you make any changes in `./src` folder

### To get started: ###
Make sure you:

* Installed all ASP.net Core dependencies
* Installed all NPM dependencies `npm install`
* Installed all Bower dependencies `bower install`
* Deployed `gulp default` task

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