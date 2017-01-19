module.exports = function(plugins, config) {
    return plugins.gulp.src([config.src.jsScripts, config.src.jsVendors])
        .pipe( config.isProd?
            plugins.util.noop() :
            plugins.plumber({
                handleError: function (err) {
                    console.log(err);
                    this.emit('end');
                }
            })
        )
        .pipe(config.isProd ? plugins.util.noop() : plugins.sourcemaps.init())
        .pipe(plugins.include({
            extensions: "js",
            includePaths: [
                config.basePath+"node_modules",
                config.srcPath+"js/scripts",
                config.srcPath+"js/vendors"
            ]
        })).on('error', console.log)
        .pipe(config.isProd ? plugins.uglify() : plugins.util.noop())
        .pipe(config.isProd ? plugins.util.noop() : plugins.sourcemaps.write('.'))
        .pipe(plugins.gulp.dest(config.dest.js))
        .pipe(config.isProd ? plugins.util.noop() : plugins.browserSync.stream());
};