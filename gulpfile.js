var gulp = require('gulp');
var config = require('./../../config.js').frontKickstart;
config.isProd = !!process.env.NODE_ENV; //récupère la variable NODE_ENV passée depuis le terminal et la convertit en booléen

var plugins = {
    gulp: gulp,
    sass: require('gulp-sass'),
    sourcemaps: require('gulp-sourcemaps'),
    concat: require('gulp-concat'),
    uglify: require('gulp-uglify'),
    clean: require('del'),
    gulpif: require('gulp-if'),
    copy: require('gulp-copy'),
    include: require('gulp-include'),
    plumber: require('gulp-plumber'),
    browserSync: require('browser-sync').create(),
    util: require('gulp-util'),
    fs: require('fs'),
    minCss: require('gulp-clean-css')
};
/* @TODO : ameliorer task de copy */
// création des tasks a partir des fichiers contenus dans /tasks
plugins.fs.readdirSync('./tasks/')
    .map(
        function(taskname){
            return taskname.substr(0, taskname.length-3);
        }
    )
    .forEach(function(taskname){
        return gulp.task(taskname, [], function(){require('./tasks/'+taskname)( plugins, config )});
    });

gulp.task('default', function(){
    console.log(plugins.util.colors.white.bold.bgBlue(
        "\n\n"+
        "  Yo ! The following tasks are available, \n"+
        "  simply type 'npm run Task' (ex 'npm run build') :  \n\n"+
        "  * 'help' : display that same log (kinda useless, i know)  \n"+
        "  * 'build' : build everything for dev, no minimizing  \n"+
        "  * 'build:prod' : 'build', but minimized  \n"+
        "  * 'watch' : 'build', and automatically rebuild modified files  \n"+
        "  * 'live' : 'watch', automatically reload browser \n"+
        "    (need url+port config in config.js)  \n"
    ));
});

gulp.task('watch', ['clean', 'copy', 'sass', 'js' ], function(){
    gulp.watch([config.filesToWatch.scss], ['sass']);
    gulp.watch([config.filesToWatch.js], ['js']);
});

gulp.task('live', ['watch', 'server']);

gulp.task('build', ['clean', 'copy', 'sass', 'js']);

gulp.task('build:prod', ['clean', 'copy', 'sass', 'js']);