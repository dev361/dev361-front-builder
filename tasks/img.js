module.exports = function(plugins, config) {
    var env = config.NODE_ENV;
    // permet d'utiliser directement le nom du plugin sans prefixer par "plugins." :
    for(var key in plugins){
        this[key] = plugins[key];
    }

    config.img.forEach(function(mapping){
        gulp.src(mapping.src)
            .pipe(gulp.dest(mapping.dest));
    });
   
};