'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awesome ' + chalk.red('generator-myangular-2-dotnetcore') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'What would be your project name?',
      default: this.appname
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.log(props.appName);
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(), {
          appName: this.props.appName
      }
    );
  },

  install: function () {
    //this.installDependencies();
    //this.spawnCommand('gulp', ['default']);
  }
});
