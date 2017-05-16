#!/usr/bin/env node

'use strict';
var yargs = require("yargs");
var spawn = require('child_process').spawn;
var path = require('path');
var cwd = path.join(__dirname, '../');
var isWin = /^win/.test(process.platform);

if (isWin) {
  var gulpExecPath = path.join(__dirname, '../../.bin/gulp.cmd');
} else {
  var gulpExecPath = path.join(__dirname, '../../.bin/gulp');
}

var argv = yargs
    .command("build", "build everything for dev, no minimizing", function (yargs) {
        spawn(
            gulpExecPath,
            ['build', '--cwd', cwd, '--color', 'always'],
            { env: {NODE_ENV: 'dev'}, stdio: 'inherit' }
        );
    })
    .command("build:prod", "build task, but minimized", function (yargs) {
        spawn(
            gulpExecPath,
            ['build:prod', '--cwd', cwd, '--color', 'always'],
            { env: {NODE_ENV: 'prod'}, stdio: 'inherit' }
        );
    })
    .command("watch", "build task, and automatically rebuild modified files", function (yargs) {
        spawn(
            gulpExecPath,
            ['watch', '--cwd', cwd, '--color', 'always'],
            { env: {NODE_ENV: 'dev'}, stdio: 'inherit' }
        );
    })
    .command("live", "watch task, plus automatically reload browser", function (yargs) {
        spawn(
            gulpExecPath,
            ['live', '--cwd', cwd, '--color', 'always'],
            { env: {NODE_ENV: 'dev'}, stdio: 'inherit' }
        );
    })
    .demandCommand(1, "Simply type 'dfb build' or whatever task you want to launch\n ")
    .help("h", "Display command list")
    .alias("h", "help")
    .argv
