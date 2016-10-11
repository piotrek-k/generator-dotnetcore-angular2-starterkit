/// <binding ProjectOpened='default' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var ts = require('gulp-typescript');
var gulp = require('gulp');
var clean = require('gulp-clean');
var merge = require('merge2');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var paths = {
    wwwroot: "./wwwroot",
    frontendLibs: "./wwwroot/lib",
    nodeModules: "node_modules/**",
    compiledSrc: "./wwwroot",
    compiledSrcFiles: "./wwwroot/**/*",
    tsConfig: './src/app/tsconfig.json',
    programmableSrc: "./src", //kod źródłowy, pliki TypeScript
    filesToWatch: "./src/**/*.{html,css,js,map}",
    mediaDest: "./wwwroot/media/",
    mediaSource: "./Media/**/*"
};

var tsProject = ts.createProject("tsconfig.json");

gulp.task('default', ["copy-npm-libraries", 'compile.watch', 'copy-media'], function () {
    // place code for your default task here
});

gulp.task("copy-npm-libraries", () => {
    var a = gulp.src([
            'core-js/client/**',
            'systemjs/dist/system.src.js',
            'reflect-metadata/**',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**',
            'jquery/dist/jquery.min.js',
            'bootstrap/dist/**/*',
            'jasmine-core/lib/jasmine-core/**/*'
    ], {
        cwd: paths.nodeModules
    })
        .pipe(gulp.dest(paths.frontendLibs));

    //in case bower didn't placed libs where he should:
    var b = gulp.src("./bower_components/**").pipe(gulp.dest(paths.frontendLibs));

    return merge(a, b);
});

gulp.task('compile-ts', function (done) {
    var sourceTsFiles = ["./src/**/*"];

    var tsResult = gulp.src(sourceTsFiles).pipe(sourcemaps.init()).pipe(ts(tsProject, undefined, ts.reporter.fullReporter()));
    tsResult.dts.pipe(gulp.dest("./wwwroot"));
    return tsResult.js
                    .pipe(sourcemaps.write('.'))
                    .pipe(gulp.dest("./wwwroot"));
});

gulp.task('copy-media', function () {
    return gulp.src(paths.mediaSource).pipe(gulp.dest(paths.mediaDest));
});

gulp.task('compile-templates', function () {
    return gulp.src(paths.filesToWatch).pipe(gulp.dest(paths.compiledSrc));
});

gulp.task('watch.compile-ts', ['compile-ts'], function () {
    return gulp.watch(paths.programmableSrc + "/**/*.ts", ['compile-ts']);
});

gulp.task('watch.compile-templates', ['compile-templates'], function () {
    return gulp.watch(paths.filesToWatch, ['compile-templates']);
});

gulp.task('compile', ['compile-ts', 'compile-templates']);

gulp.task('compile.watch', ['watch.compile-ts', 'watch.compile-templates']);

gulp.task('clean-wwwroot', function () {
    return gulp.src(paths.wwwroot)
        .pipe(clean());
});

gulp.task('clean-js-from-src', function () {
    gulp.src(['./src/**/*.js', './src/**/*.map', '!./src/**/*.config.js'])
      .pipe(clean());
});