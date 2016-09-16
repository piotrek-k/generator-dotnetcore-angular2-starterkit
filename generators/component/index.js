'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
}

var STORAGE = {
    dest: "componentDestination"
};

module.exports = yeoman.Base.extend({
    prompting: function () {
        // Have Yeoman greet the user.
        this.log(yosay(
            "Let's build Angular2 component!"
            ));

        this.savedComponentDestination = this.config.get(STORAGE.dest);

        var prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'How would you like to name it?',
                default: "Default"
            },
            {
                type: 'input',
                name: 'dstPath',
                message: 'Where would you like to place it? ("Enter" to set default value)',
                default: this.savedComponentDestination ? this.savedComponentDestination : "./src/Angular2Template/src/app/"
            }
        ];

        return this.prompt(prompts).then(function (props) {
            // To access props later use this.props.someAnswer;
            props.name = props.name.toLowerCase();
            props.name = props.name.charAt(0).toUpperCase() + "" + props.name.slice(1);
            props.nameCamelCase = camelize(props.name);
            props.nameToLower = props.name.toLowerCase();

            this.config.set(STORAGE.dest, props.dstPath);

            this.props = props;
            this.log(props.name + " seems pretty good :]");
        }.bind(this));
    },

    writing: function () {
        this.stringToExchange = "app";
        var files = [
            "app.component.ts",
            "app.component.html",
            "app.component.css"
        ];
        for (var f in files) {
            this.fileName = files[f];
            this.fs.copyTpl(
                this.templatePath(this.fileName),
                this.destinationPath(this.props.dstPath + "/" + this.props.nameToLower + "/" + (this.fileName.replace(this.stringToExchange, this.props.nameToLower))), {
                    name: this.props.name,
                    nameLowerCase: this.props.nameToLower,
                    nameCamelCase: this.props.nameCamelCase
                });
        }
    },

    install: function () {
        // this.installDependencies();
        // this.spawnCommand('gulp', ['default']);
    }
});
