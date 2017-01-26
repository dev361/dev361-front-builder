module.exports = function(plugins, config) {
    var env = config.NODE_ENV;
    // permet d'utiliser directement le nom du plugin sans prefixer par "plugins." :
    for(var key in plugins){
        this[key] = plugins[key];
    }
    var tasksFn = {
        prodTask: function(config){
            config.js.forEach(function(mapping){
                var src = mapping.src;
                var destDir = mapping.dest.substr( 0, (mapping.dest.lastIndexOf("/")+1 ));
                var destName = mapping.dest.substr( mapping.dest.lastIndexOf("/")+1 );
                
                return gulp.src(src)
                    .pipe(concat(destName))
                    .pipe(include().on('error', console.log))
                    .pipe(gulp.dest(destDir));
            });
        },
        devTask: function(config){
            config.js.forEach(function(mapping){
                var src = mapping.src;
                var destDir = mapping.dest.substr( 0, (mapping.dest.lastIndexOf("/")+1 ));
                var destName = mapping.dest.substr( mapping.dest.lastIndexOf("/")+1 );
                
                return gulp.src(src)
                    .pipe(plumber({ handleError: function(err){ console.log(err); this.emit('end'); } }) )
                    .pipe(concat(destName))
                    .pipe(sourcemaps.init())
                    .pipe(include().on('error', console.log))
                    .pipe(sourcemaps.write('.'))
                    .pipe(gulp.dest(destDir))
                    .pipe(browserSync.stream());
            });
        },
        defaultTask: function(){
            console.log(util.colors.red.bold('* No Js task for ' + env + ' environment, launching Prod task *'));
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
    
};