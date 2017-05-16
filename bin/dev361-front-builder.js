#!/usr/bin/env node

'use strict';
var yargs = require("yargs");
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var path = require('path');
var cwd = path.join(__dirname, '../');
var isWin = /^win/.test(process.platform);

if (isWin) {
  var gulpExecPathOld = path.join(__dirname, '../node_modules/.bin/gulp.cmd');
  var gulpExecPathNew = path.join(__dirname, '../../.bin/gulp.cmd');
} else {
  var gulpExecPathOld = path.join(__dirname, '../node_modules/.bin/gulp');
  var gulpExecPathNew = path.join(__dirname, '../../.bin/gulp');
}

var argv = yargs
    .command("build", "build everything for dev, no minimizing", function (yargs) {
        exec('npm -v', function (error, stdout, stderr) {
            var versionNb = stdout.charAt(0);

            if(versionNb < 3 ){
                spawn(
                    gulpExecPathOld,
                    ['build', '--cwd', cwd, '--color', 'always'],
                    { env: {NODE_ENV: 'dev'}, stdio: 'inherit' }
                )
            } else {
                spawn(
                    gulpExecPathNew,
                    ['build', '--cwd', cwd, '--color', 'always'],
                    { env: {NODE_ENV: 'dev'}, stdio: 'inherit' }
                )
            }
        });
        
    })
    .command("build:prod", "build task, but minimized", function (yargs) {
        exec('npm -v', function (error, stdout, stderr) {
            var versionNb = stdout.charAt(0);

            if(versionNb < 3 ){
                spawn(
                    gulpExecPathOld,
                    ['build:prod', '--cwd', cwd, '--color', 'always'],
                    { env: {NODE_ENV: 'dev'}, stdio: 'inherit' }
                )
            } else {
                spawn(
                    gulpExecPathNew,
                    ['build:prod', '--cwd', cwd, '--color', 'always'],
                    { env: {NODE_ENV: 'dev'}, stdio: 'inherit' }
                )
            }
        });
    })
    .command("watch", "build task, and automatically rebuild modified files", function (yargs) {
        exec('npm -v', function (error, stdout, stderr) {
            var versionNb = stdout.charAt(0);

            if(versionNb < 3 ){
                spawn(
                    gulpExecPathOld,
                    ['watch', '--cwd', cwd, '--color', 'always'],
                    { env: {NODE_ENV: 'dev'}, stdio: 'inherit' }
                )
            } else {
                spawn(
                    gulpExecPathNew,
                    ['watch', '--cwd', cwd, '--color', 'always'],
                    { env: {NODE_ENV: 'dev'}, stdio: 'inherit' }
                )
            }
        });
    })
    .command("live", "watch task, plus automatically reload browser", function (yargs) {
        exec('npm -v', function (error, stdout, stderr) {
            var versionNb = stdout.charAt(0);

            if(versionNb < 3 ){
                spawn(
                    gulpExecPathOld,
                    ['live', '--cwd', cwd, '--color', 'always'],
                    { env: {NODE_ENV: 'dev'}, stdio: 'inherit' }
                )
            } else {
                spawn(
                    gulpExecPathNew,
                    ['live', '--cwd', cwd, '--color', 'always'],
                    { env: {NODE_ENV: 'dev'}, stdio: 'inherit' }
                )
            }
        });
    })
    .demandCommand(1, "Simply type 'dfb build' or whatever task you want to launch\n ")
    .help("h", "Display command list")
    .alias("h", "help")
    .argv
