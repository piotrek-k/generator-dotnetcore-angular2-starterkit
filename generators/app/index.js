'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var replaceName = require('gulp-replace-name');
var rename = require("gulp-rename");

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
}

function afterInstallingDependencies(context) {
    context.log("***");
    context.log("***");
    context.log("NPM installed");
    context.log("***");
    context.log("***");
    context.log("Restoring dotnet packages:");
    context.spawnCommand("dotnet", ["restore"]).on('close', function () {
        context.log("***");
        context.log("***");
        context.log("DOTNET restore finished");
        context.log("***");
        context.log("***");
        context.log("Creating database: ");
        context.spawnCommand("dotnet", ["ef", "database", "update"]).on('close', function () {
            context.log("***");
            context.log("***");
            context.log("If everything went OK and 'default' task finishes, your project is ready and you can run it by typing `dotnet run`");
            context.log("***");
            context.log("***");
            context.log("Gulp tasks:");
            context.spawnCommand('gulp', ['default']);
        });
    });
}

module.exports = yeoman.Base.extend({
    prompting: function () {
        // Have Yeoman greet the user.
        this.log(yosay(
            "Let's create some nice ASP.net Core Angular 2 project :)"
        ));

        this.log("This generator won't run correctly if you don't have npm, dotnet core or gulp installed!");
        this.log("If you ever had any problems: read README.md file. It's on GitHub or in project that I'll generate now.");

        var prompts = [
            {
                type: 'input',
                name: 'appName',
                message: 'What would be your project name?',
                default: this.appname
            },
            {
                type: 'confirm',
                name: 'runBuild',
                message: 'Would you like to build project (npm, dotnet, gulp) right after scaffolding it?',
                default: true,
                store: true
            },
            {
                type: 'confirm',
                name: 'useCache',
                message: 'Do you want to use npm-cache to speed up installing dependecies? (make sure you have npm-cache installed!)',
                default: false,
                store: true
            }];

        return this.prompt(prompts).then(function (props) {
            // To access props later use this.props.someAnswer;
            props.appName = camelize(props.appName);
            this.props = props;
            this.log(props.appName);
        }.bind(this));
    },

    writing: function () {
        //this.registerTransformStream(replaceName(/(666replacethat666|666Angular2Template666)/g, this.props.appName));
        var THAT = this;
        this.registerTransformStream(rename(function(path){
            path.basename = path.basename.replace(/(666replacethat666|666Angular2Template666)/g, THAT.props.appName);
            path.dirname = path.dirname.replace(/(666replacethat666|666Angular2Template666)/g, THAT.props.appName);
        }));
        console.log("copying..." + this.templatePath() + " ... " + this.destinationPath() + " ... " + this.props.appName);
        this.fs.copyTpl(
            //path.join(this.templatePath(),"/*/**"),
            this.templatePath(),
            this.destinationPath(), {
                appName: this.props.appName
            });
        console.log("done!...");
    },

    install: function () {
        if (this.props.runBuild) {
            //this.installDependencies();
            var startingDirectory = "src/Angular2Template";
            var elementDir = path.join(process.cwd(), startingDirectory);
            process.chdir(elementDir);
            var context = this;

            if (this.props.useCache) {
                context.spawnCommand("npm-cache", ["install"])
                    .on('close', function () { afterInstallingDependencies(context); });
            }
            else {
                this.installDependencies(
                    {
                        callback: function () { afterInstallingDependencies(context); }
                    });
            }
        }
    }
});
