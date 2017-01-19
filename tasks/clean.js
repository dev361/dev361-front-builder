module.exports = function(plugins, config) {
    plugins.clean.sync([config.destPath], {force: true})
	    .forEach(function(deleted){
	        console.log(plugins.util.colors.green('Directory '+deleted+' was deleted'));
	    });
};