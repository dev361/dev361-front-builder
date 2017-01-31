/* @TODO : ameliorer task de copy
 * completer readme
 * support es6
 * fichier unique/point d'entree pour config bootstrap, ou liste de fichiers dans la config?
 * */

var plugins = {
    gulp: require('gulp'),
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

// Retrieve config + tasks :
var config = require('./utils/find-config');
require('./utils/create-tasks')(plugins, config);

// Main tasks definition
plugins.gulp.task('watch', ['clean', 'copy', 'img', 'sass', 'js'], function () {
    config.watch.forEach(function (mapping) {
        return gulp.watch(mapping.filesToWatch, mapping.task);
    });
});

plugins.gulp.task('live', ['server', 'watch']);

plugins.gulp.task('build', ['clean', 'copy', 'img', 'sass', 'js']);

plugins.gulp.task('build:prod', ['clean', 'copy', 'img', 'sass', 'js']);
    

