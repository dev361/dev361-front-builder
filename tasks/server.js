module.exports = function(plugins, config) {
    if(config.bs){
        plugins.browserSync.init({
            baseDir: "./",
            port: config.bs.portNumber,
            proxy: config.bs.routing,
            reloadOnRestart : true
        });
    } else {
        console.log(plugins.util.colors.red('routing + portNumber not defined in config.js, no browser reload'));
    }
};