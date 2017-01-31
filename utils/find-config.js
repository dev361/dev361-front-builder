
// Function to generate config file based on dfb.config.js and dfb.env.js (if possible)

var findup = require('findup-sync');
var config = require(findup('dfb.config.js')).frontBuilder;
config.NODE_ENV = process.env.NODE_ENV;

if (findup('dfb.env.js') !== null){
    Object.assign(config, require(findup('dfb.env.js')));
}

module.exports = config;