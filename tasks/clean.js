module.exports = function(plugins, config) {
	var env = config.NODE_ENV;
    // permet d'utiliser directement le nom du plugin sans prefixer par "plugins." :
    for(var key in plugins){
        this[key] = plugins[key];
    }

	config.cleanBeforeBuild.forEach(function(mapping){
		return clean.sync(mapping.destroy, {force: true})
        	    .forEach(function(deleted){
        	        console.log(plugins.util.colors.green('* Directory '+deleted+' was deleted *'));
        	    });
	});

};