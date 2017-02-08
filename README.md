Dev361 Front-End Assets Builder
========================

Dev361-Front-Builder, or DFB, is a simple Gulp wrapper used to build assets with a few basic tasks and paths configuration.
       
## Installation

```
$ npm install --save dev361-front-builder
```

And add these scripts to your package.json :
```
{
  "scripts": {
    "dfb" : "node_modules/.bin/dfb help",
    "dfb:build" : "./node_modules/.bin/dfb build",
    "dfb:build:prod" : "./node_modules/.bin/dfb build:prod",
    "dfb:watch" : "./node_modules/.bin/dfb watch",
    "dfb:live" : "./node_modules/.bin/dfb live"
  }
}
```


## Configuration

Create a **dfb.config.js** file at project root, put your project's assets path in it like so :
```
var config = {
    frontBuilder : {
        js: [
            {src: 'path/to/jsSourceFile.js', dest: 'path/to/jsDestinationFile.js'},
            {src: ['path/to/otherJsSourceFile1.js', 'path/to/otherJsSourceFile2.js'], dest: 'path/to/otherJsDestinationFile.js' }
        ],
        css: [
            {src: 'path/to/sassSourceFile.scss', dest: 'path/to/compiledCssFile.css'}
        ],
        copy: [
            {src: 'path/to/directoryToCopy/**/*', dest: 'path/to/destinationDirectory/'}
        ],
        img: [
            {src: 'path/to/imagesDirectoryToCopy/**/*', dest: 'path/to/imagesDestinationDirectory/'}
        ],
        cleanBeforeBuild: [
            {destroy: 'path/to/directoryToDestroy'}
        ],
        watch: [
            {filesToWatch: 'path/to/sassFiles/**/*.scss', task: ['sass']},
            {filesToWatch: 'path/to/jsFiles/**/*.js', task: ['js']}
        ]
    }
}
```


Each key inside frontBuilder is an array of paths used in a task, each path in the form of an object with 2 keys, **src** (source) and **dest** (destination). 
* **js** and **sass** : type : array of objects
	* **src** : single file path, blob, or array of files path
	* **dest** : single file path
* **copy** and **img** type : array of objects
	* **src** : single file path, blob, or array of files path
    * **dest** : single directory 
* **cleanBeforeBuild** type : array of objects
	* **destroy** : single directory 
* **watch** type : array of objects
	* **filesToWatch** : single file path or blob 
	* **task** : array of tasks to run (don't modify unless you know what you're doing)

**Don't remove keys, keep the global file structure, simply add/modify path.** 

Or the world will collapse.

You've been warned. 
 
 
## Special extra DevFrontConfig

Create a **dfb.env.js**  file at project root.  
Basically this file will be used to run BrowserSync, but you can also override global config if needed (why on earth would you want to do that? i don't know, but anyway, it will work).

This file contains another config object :

``` 
var env = {
    /* BrowserSync Config
     /* watch css and js files, if you wish to watch other type of files, add it to the 'files' key
     */
    bs: {
        routing: "www.url-of-your-project.dev",
        portNumber: "2020"
        //files: [basePath+'**!/!*.php', basePath+'**!/!*.html']
    }
    /* and you can do that, too (js will override the js key in dfb.config.js) :
    , js: [
        {src: 'my/personal/src/path', dest: 'my/personal/dest/path' }
    ]*/
}
```
If you want to run BrowserSync, simply put in your project's url (ex _www.url-of-your-project.dev_) and a port of your choice (ex _2020_), then open _www.url-of-your-project.dev:2020_.  
Browser will now be reloaded on js and scss modification.  
Add path files if you want to reload on php/html/whatever modification.

## Use DFB
Main commands here, tasks details explained below

### general help
```
$ npm run dfb
```
### build
```
$ npm run dfb:build
```
launch **clean**, **js dev**, **sass dev**, **copy**, **img**
### build:prod
```
$ npm run dfb:build:prod
```
launch **clean**, **js prod**, **sass prod**, **copy**, **img**
### watch
```
$ npm run dfb:watch
```
launch **build**, **watch** and automatically rebuild modified files 
### live
```
$ npm run dfb:live
```
launch **watch** and **server** (reload browser on file modifications - need extra config)

### Tasks details

* **js task** : 
	* **DEV** : concatenate, generate sourcemaps, stream result to BrowserSync
	* **PROD** : concatenate, uglify
* **sass task** :
	* **DEV** : concatenate, generate sourcemaps, stream result to BrowserSync
    * **PROD** : concatenate, minify
* **copy task** : simply copy assets from one directory to another (used for fonts, for example)
* **img task** : copy images from one directory to another
* **clean** : remove build directory before launching other tasks
* **watch task** : watch files modifications 
* **server** : launch BrowserSync to reload pages, need extra config (in dfb.env.js)

