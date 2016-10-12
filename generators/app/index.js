'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var rename = require("gulp-rename");
var fnc = require("../functions.js");

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
            },
            {
                type: 'list',
                name: 'templateToCopy',
                message: "Which template do you want to use? (they offers nearly the same functionality, but uses different tools. See README for details)",
                choices: [
                    {
                        name: "Template2 (recommended): from aspnet-spa generator but enhanced (with db and login functionality)",
                        value: 'template2'
                    },
                    {
                        name: "Template1: original, based on Angular.io tutorial ",
                        value: 'template1'
                    }
                ]
            }];

        return this.prompt(prompts).then(function (props) {
            // To access props later use this.props.someAnswer;
            props.appName = fnc.capitalizeFirstLetter(fnc.camelize(props.appName));
            this.props = props;
            this.log(props.appName);
            this.log(props.templateToCopy);
        }.bind(this));
    },

    writing: function () {
        var path = "";
        if (this.props.templateToCopy === "template1") {
            path = this.templatePath() + "/template1/";
        }
        if (this.props.templateToCopy === "template2") {
            path = this.templatePath() + "/template2/";
        }

        var THAT = this;
        this.registerTransformStream(rename(function (path) {
            path.basename = path.basename.replace(/(666replacethat666|666Angular2Template666|Angular2TemplateTwo666)/g, THAT.props.appName);
            path.dirname = path.dirname.replace(/(666replacethat666|666Angular2Template666|Angular2TemplateTwo666)/g, THAT.props.appName);
        }));
        //console.log("appName", this.props.appName, "TemplatePath", this.templatePath());
        this.fs.copyTpl(
            path,
            this.destinationPath(), {
                appName: this.props.appName,
                "newAppName": this.props.appName,
            });

        //folders that names begin with dot are being ommited. They have to be copied individually
        this.fs.copy(
            path+".vscode/*.json",
            this.destinationPath()+"/.vscode", {
                globOptions: { dot: true }
            });
    },

    install: function () {
        console.log("runBuild: " + this.props.runBuild);
        if (this.props.runBuild) {
            //this.installDependencies();
            // var startingDirectory = this.props.appName; //"src/" + 
            // var elementDir = path.join(process.cwd(), startingDirectory);
            // process.chdir(elementDir);
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
