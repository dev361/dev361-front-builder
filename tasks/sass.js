module.exports = function (plugins, config) {
    var env = config.NODE_ENV;
    // permet d'utiliser directement le nom du plugin sans prefixer par "plugins." :
    for(var key in plugins){
        this[key] = plugins[key];
    }
    
    var tasksFn = {
        prodTask: function(config){
            config.css.forEach(function(mapping){
                var src = mapping.src;
                var destDir = mapping.dest.substr( 0, (mapping.dest.lastIndexOf("/")+1 ));
                var destName = mapping.dest.substr( mapping.dest.lastIndexOf("/")+1 );
                
                return gulp.src(src)
                    .pipe(concat(destName))
                    .pipe(sass({debugInfo: true, errLogToConsole: true}))
                    .pipe(minCss({debug: true}, function(details) {
                            console.log(util.colors.green('* File ' + details.name + ' was minified from ' + details.stats.originalSize + ' to ' + details.stats.minifiedSize + ' bytes, isn\'t that great ? *\n'));
                        })
                    )
                    .pipe(gulp.dest(destDir))
            });
        },
        devTask: function(config){
            config.css.forEach(function(mapping){
                var src = mapping.src;
                var destDir = mapping.dest.substr( 0, (mapping.dest.lastIndexOf("/")+1 ));
                var destName = mapping.dest.substr( mapping.dest.lastIndexOf("/")+1 );
                
                return gulp.src(src)
                    .pipe(plumber({handleError: function (err) {console.log(err);this.emit('end');} }) )
                    .pipe(concat(destName))
                    .pipe(sourcemaps.init())
                    .pipe(sass({debugInfo: true, errLogToConsole: true}))
                    .pipe(sourcemaps.write('.'))
                    .pipe(gulp.dest(destDir))
                    .pipe(browserSync.stream({match: "**/*.css"})); // reinject css instead of reloading entire page
            });
        },
        defaultTask: function(){
            console.log(util.colors.red.bold('* No Sass task for ' + env + ' environment, launching Prod task *'));
            tasksFn.prodTask(config);
        }
    }
    
    if (typeof env !== 'undefined')  {
        if (typeof tasksFn[env + 'Task'] === "function") {
            console.log(util.colors.green("* Running " + env + "Task *"));
            tasksFn[env + 'Task'](config);
        } else {
            console.log(util.colors.green("* Running defaultTask *"));
            tasksFn['defaultTask']();
        }
    } else {
        console.log(util.colors.red.bold('* No defined environment, launching Prod Task *'));
        tasksFn.prodTask(config);
    }
    
    /*
    return plugins.gulp.src(config.src.scssMain)
        .pipe(config.isProd ?
            plugins.util.noop() :
            plugins.plumber({
                handleError: function (err) {
                    console.log(err);
                    this.emit('end');
                }
            })
        )
        .pipe(config.isProd ? plugins.util.noop() : plugins.sourcemaps.init())
        .pipe(plugins.sass({debugInfo: true, errLogToConsole: true}))
        .pipe(config.isProd ?
            plugins.minCss({debug: true}, function(details) {
                console.log(plugins.util.colors.green('File ' + details.name + ' was minified from ' + details.stats.originalSize + ' to ' + details.stats.minifiedSize + ' bytes, isn\'t that great ?\n'));
            }) :
            plugins.util.noop()
        )
        .pipe(config.isProd ? plugins.util.noop() : plugins.sourcemaps.write('.'))
        .pipe(plugins.gulp.dest(config.dest.css))
        .pipe(config.isProd ? plugins.util.noop() : plugins.browserSync.stream({match: "**!/!*.css"})); // reinject css instead of reloading entire page*/
};