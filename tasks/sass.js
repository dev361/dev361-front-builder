module.exports = function (plugins, config) {
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
        .pipe(config.isProd ? plugins.util.noop() : plugins.browserSync.stream({match: "**/*.css"})); // reinject css instead of reloading entire page
};