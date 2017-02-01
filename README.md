Dev361 Front-End Assets Builder
========================

Dev361-Front-Builder, or DFB, is a simple Gulp wrapper used to build assets with a few basic tasks and paths configuration.
       
### Installation

Grab or create the package.json at project root :
```
{
  "name": "projectname",
  "author": "dev361",
  "license": "ISC",
  "version": "1.0.0",
  "dependencies": {
    "bootstrap-sass": "^3.3.7",
    "dev361-front-builder": "1.0.3",
    "jquery": "^3.1.1",
    "npm-modernizr": "^2.8.3"
  },
  "scripts": {
    "dfb" : "node_modules/.bin/dfb help",
    "dfb:build" : "./node_modules/.bin/dfb build",
    "dfb:build:prod" : "./node_modules/.bin/dfb build:prod",
    "dfb:watch" : "./node_modules/.bin/dfb watch",
    "dfb:live" : "./node_modules/.bin/dfb live"
  }
}
```
This will install **Dev361 Front Builder**, **Bootstrap 3**, **Jquery 3**, and **Modernizr 2**. 

The only required dependency is **dev361-front-builder**, feel free to add or remove  dependencies, or change their versions as needed.

To install, type

```
$ npm install
```

### Configuration

Put your project's assets path in dfb.config.js which contains one big config object :
```
var ROOT= __dirname+'/';
var srcPath= ROOT+'assets/';
var destPath= ROOT+'build/';

var config = {
    frontBuilder : {
        js: [
            {src: srcPath+'js/vendors.js', dest: destPath+'js/vendors.js'},
            {src: [srcPath+'js/scripts/script1.js', srcPath+'js/scripts/script2.js'], dest: destPath+'js/scripts.js' }
        ],
        css: [
            {src: srcPath+'scss/main.scss', dest: destPath+'css/main.css'}
        ],
        copy: [
            {src: srcPath + 'fonts/**/*', dest: destPath + 'fonts/'}
        ],
        img: [
            {src: srcPath + 'img/**/*', dest: destPath + 'img/'}
        ],
        cleanBeforeBuild: [
            {destroy: destPath}
        ],
        watch: [
            {filesToWatch: srcPath+'scss/**/*.scss', task: ['sass']},
            {filesToWatch: srcPath+'js/scripts/*.js', task: ['js']}
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

You can also define some extra private settings, copy **dfb.env.js.dist** and rename it : **dfb.env.js**  
File will not be committed so you can have your own personal settings in here.  
Basically this file will be used to run BrowserSync, but you can also override global config if needed (why on earth would you want to do that? i don't know, but anyway, it will work).

This file contains another config object :

``` 
var env = {
    /* BrowserSync Config
     /* watch css and js files, if you wish to watch other type of files, add it to the 'files' key
     */
    bs: {
        routing: "www.xvallot.front-kickstart.dev/",
        portNumber: "8787",  // pick one between 8181 and 8989
        //files: [basePath+'**!/!*.php', basePath+'**!/!*.html']
    }
    /* and you can do that, too (js will override the js key in dfb.config.js) :
    , js: [
        {src: 'myPersonalPath', dest: 'myPersonalPath' }
    ]*/
}
```
If you want to run BrowserSync, simply put in your project's url, and a port between 8181 and 8989.  
Browser will now be reloaded on js and scss modification.  
Add path files if you want to reload on php/html/whatever modification.

### Use DFB
Main commands here, tasks details explained below

#### general help
```
$ npm run dfb
```
#### build
```
$ npm run dfb:build
```
launch **clean**, **js dev**, **sass dev**, **copy**, **img**
#### build:prod
```
$ npm run dfb:build:prod
```
launch **clean**, **js prod**, **sass prod**, **copy**, **img**
#### watch
```
$ npm run dfb:watch
```
launch **build**, **watch** and automatically rebuild modified files 
#### live
```
$ npm run dfb:live
```
launch **watch** and **server** (reload browser on file modifications - need extra config)

#### Tasks details

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


### Recommanded assets structure

```
assets/
┃ ┣ js/                                # Layout global includes
┃ ┃   ┣ vendors.js                     # Vendors inclusion, entry point for the js task 
┃ ┃   ┣ scripts.js                     # Personal scripts inclusion, entry point for the js task 
┃ ┃   ┗scripts/                        # Your personal scripts
┃ ┃     ┣ script1.js
┃ ┃     ┗ script2.js
┃ ┃   ┗ vendors/                       # Vendors configuration scripts 
┃ ┃      ┗ bootstrap.js                (override vendors scripts, for example bootstrap.js is an override of 
┃ ┃                                      ./node_modules/bootstrap-sass/assets/javascripts/bootstrap-sprockets.js) 
┃ ┃
┃ ┣ fonts/                             # Fonts
┃ ┃   ┣ roboto/                        # If local fonts, better to keep inside font-name with font-weight-sub-folders to avoid a long file list of different types
┃ ┃   ┃ ┣ roboto_condensed/
┃ ┃   ┃ ┗ roboto_bold/
┃ ┃   ┣ font-1/
┃ ┃   ┗ font-2/
┃ ┃
┃ ┣ img/
┃ ┃   ┣backgrounds/
┃ ┃   ┣icons/
┃ ┃   ┣page-1/
┃ ┃   ┣page-2/
┃ ┃   ┣page-3/
┃ ┃   ┣user/
┃ ┃   ┗quiz/
┃ ┃
┃ ┣ scss/
┃ ┃   ┃

┃ ┣ scss/
┃ ┃   ┣  main.scss                     # File imports everything needed, main entry point for sass task
┃ ┃   ┃
┃ ┃   ┣pages/                          # Project pages, a single .scss file per page
┃ ┃   ┃  ┣ _page-1.scss
┃ ┃   ┃  ┗ _page-2.scss
┃ ┃   ┃
┃ ┃   ┣fonts/
┃ ┃   ┃  ┗ _fonts.scss
┃ ┃   ┃
┃ ┃   ┣offline/                        # Sign in and sign up with other pages related to offline mode - to be related to /elements/_forms.scss
┃ ┃   ┃  ┣ _sign-in.scss
┃ ┃   ┃  ┗ _sign-up.scss
┃ ┃   ┃
┃ ┃   ┣layout/
┃ ┃   ┃  ┣ _layout.scss                # @imports here
┃ ┃   ┃  ┣ _header.scss
┃ ┃   ┃  ┣ _footer.scss
┃ ┃   ┃  ┗composition/                 # If any Sub-element, Ex:  _header.scss @import '_navbar-menu.scss'
┃ ┃   ┃      ┗_navbar-menu.scss
┃ ┃   ┃
┃ ┃   ┣elements/                       # Any block of element partially used all over the project
┃ ┃   ┃  ┣ _elements.scss              # @imports here
┃ ┃   ┃  ┣ _buttons.scss
┃ ┃   ┃  ┣ _forms.scss
┃ ┃   ┃  ┗ _lists.scss
┃ ┃   ┃
┃ ┃   ┗utilities/
┃ ┃   ┃  ┗ _mixins.scss
┃ ┃   ┃  ┗ _variables.scss
┃ ┃   ┃
┃ ┃   ┗helpers/
┃ ┃   ┃  ┗ _helpers.scss               # Useful classes (Optional)
┃ ┃   ┃
┃ ┃   ┗responsive/
           ┗ _responsive.scss          # Responsive media queries (Optional)
┃ ┃   ┣vendors/                        # One folder per vendor
┃ ┃   ┃  ┣bootstrap/
┃ ┃   ┃  ┃  ┗ _bootstrap_custom_config.css    # Override Bootstrap config
┃ ┃   ┃  ┃  ┗ _bootstrap_custom_variables.css # Override Bootstrap variables
┃ ┃   ┃

```
