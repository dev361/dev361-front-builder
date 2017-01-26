module.exports = function(plugins, config) {
    if(typeof config.bs !== 'undefined'){
        plugins.browserSync.init({
            files: config.bs.files,
            port: config.bs.portNumber,
            proxy: config.bs.routing,
            reloadOnRestart : true,
        });
    } else {
        console.log(plugins.util.colors.red('* Missing parameters for BrowserSync in config.js, no browser reload, sorry *'));
    }
};