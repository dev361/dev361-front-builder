/* @TODO : ameliorer task de copy
 * completer readme
 * support es6
 * config browsersync definir defaut+port en commande+fallback
 * fichier unique/point d'entree pour config bootstrap, ou liste de fichiers dans la config?
 * */

var gulp = require('gulp');
var path = require('path');
var config = require('./../../config.js').frontKickstart;
config.NODE_ENV = process.env.NODE_ENV;
console.log(process.argv);
var plugins = {
    gulp: gulp,
    sass: require('gulp-sass'),
    sourcemaps: require('gulp-sourcemaps'),
    concat: require('gulp-concat'),
    uglify: require('gulp-uglify'),
    clean: require('del'),
    copy: require('gulp-copy'),
    include: require('gulp-include'),
    plumber: require('gulp-plumber'),
    browserSync: require('browser-sync').create(),
    util: require('gulp-util'),
    fs: require('fs'),
    minCss: require('gulp-clean-css')
};

// création des tasks a partir des fichiers contenus dans /tasks
plugins.fs.readdirSync('./tasks/')
    .map(
        function (taskname) {
            return taskname.substr(0, taskname.length - 3);
        }
    )
    .forEach(function (taskname) {
        return gulp.task(taskname, [], function () {
            require('./tasks/' + taskname)(plugins, config)
        });
    });

gulp.task('watch', ['clean', 'copy', 'img', 'sass', 'js'], function () {
    config.watch.forEach(function (mapping) {
        return gulp.watch(mapping.filesToWatch, mapping.task);
    });
});

gulp.task('live', ['server', 'watch']);

gulp.task('build', ['clean', 'copy', 'img', 'sass', 'js']);

gulp.task('build:prod', ['clean', 'copy', 'img', 'sass', 'js']);
