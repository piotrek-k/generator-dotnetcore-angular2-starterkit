'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
}

module.exports = yeoman.Base.extend({
    prompting: function () {
        // Have Yeoman greet the user.
        this.log(yosay(
            "Let's create some nice ASP.net Core Angular 2 project :)"
            ));

        this.log("If you ever had any problems: read README.md file on GitHub or in your new project folder.");

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
                message: 'Would you like to build project (npm, bower, gulp) right after scaffolding it?',
                default: true
            }];

        return this.prompt(prompts).then(function (props) {
            // To access props later use this.props.someAnswer;
            props.appName = camelize(props.appName);
            this.props = props;
            this.log(props.appName);
        }.bind(this));
    },

    writing: function () {
        this.fs.copyTpl(
            this.templatePath(),
            this.destinationPath(), {
                appName: this.props.appName
            });
    },

    install: function () {
        if (this.props.runBuild) {
            //this.installDependencies();
            var startingDirectory = "src/Angular2Template";
            var elementDir = path.join(process.cwd(), startingDirectory);
            process.chdir(elementDir);
            var context = this;
            this.installDependencies(
                {
                    callback: function () {
                        context.log("***");
                        context.log("***");
                        context.log("NPM and Bower installed");
                        context.log("***");
                        context.log("***");
                        context.log("Restoring dotnet packages:");
                        context.spawnCommand("dotnet", ["restore"]);
                        context.log("***");
                        context.log("***");
                        context.log("Gulp tasks:");
                        context.spawnCommand('gulp', ['default']);
                    }
                });
            // this.log("*************************************");
            // this.log("*******Starting installation*********");
            // this.log("**********DOTNET PACKAGES************");
            // this.spawnCommand("dotnet", ["restore"], {cwd: startingDirectory});
            // this.log("**************NPM********************");
            // this.spawnCommand("npm", ["install"], {cwd: startingDirectory});
            // this.log("**************Bower******************");
            // this.spawnCommand("bower", ["install"], {cwd: startingDirectory});
            // this.log("**************Gulp*******************");
            // this.spawnCommand('gulp', ['default'], {cwd: startingDirectory});
        }
    }
});
