module.exports = function(plugins, config) {
    
    plugins.gulp.src(config.src.img+'**')
        .pipe(plugins.gulp.dest(config.dest.img));
    
    plugins.gulp.src(config.src.fonts+'**')
        .pipe(plugins.gulp.dest(config.dest.fonts));
    
};