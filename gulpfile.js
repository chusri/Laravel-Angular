const elixir = require('laravel-elixir');

// require('laravel-elixir-vue');

require('laravel-elixir-config');
require('laravel-elixir-karma');
require('laravel-elixir-browsersync-official');
require('./tasks/concatScripts.task.js');
require('./tasks/swPrecache.task.js');
require('./tasks/ngHtml2Js.task.js');
require('./tasks/angular.task.js');
require('./tasks/bower.task.js');

if (!elixir.config.production) {
  // require('./tasks/phpcs.task.js')
}

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

// elixir(mix => {
//     // mix.sass('app.scss')
//     //    .webpack('app.js');
//     var assets = [
//             'public/js/final.js',
//             'public/css/final.css'
//         ],
//         scripts = [
//             './public/js/vendor.js', './public/js/partials.js', './public/js/app.js'
//         ],
//         styles = [
//             './public/css/vendor.css', './public/css/app.css'
//         ],
//         karmaJsDir = [
//             'public/js/vendor.js',
//             'node_modules/angular-mocks/angular-mocks.js',
//             'node_modules/ng-describe/dist/ng-describe.js',
//             'public/js/partials.js',
//             'public/js/app.js',
//             'tests/angular/**/*.spec.js'
//         ];

//     mix
//         .bower()
//         .angular('./angular/')
//         .ngHtml2Js('./angular/**/*.html')
//         .concatScripts(scripts, 'final.js')
//         .sass(['./angular/**/*.scss', '!./angular/critical.scss'], 'public/css')
//         .sass('./angular/critical.scss', 'public/css/critical.css')
//         .styles(styles, './public/css/final.css')
//         .version(assets)
//         .swPrecache();

// });

elixir(mix => {
    var jsOutputFolder = elixir.config.js.outputFolder
    var cssOutputFolder = elixir.config.css.outputFolder
    var fontsOutputFolder = elixir.config.fonts.outputFolder
    var buildPath = elixir.config.buildPath

    var assets = [
        'public/js/final.js',
        'public/css/final.css'
    ],
    scripts = [
        './public/js/vendor.js',
        './public/js/partials.js',
        './public/js/app.js',
        './public/dist/js/app.js'
    ],
    styles = [
        './public/css/vendor.css',
        './public/css/app.css'
    ],
    karmaJsDir = [
        jsOutputFolder + '/vendor.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'node_modules/ng-describe/dist/ng-describe.js',
        jsOutputFolder + '/partials.js',
        jsOutputFolder + '/app.js',
        'tests/angular/**/*.spec.js'
    ]

    mix
        .bower()
        .angular('./angular/')
        .ngHtml2Js('./angular/**/*.html')
        .concatScripts(scripts, 'final.js')
        .sass('./angular/**/*.scss', 'public/css')
        .styles(styles, './public/css/final.css')
        .version(assets)
        .browserSync({
            proxy: 'localhost:8000'
        })
        .karma({
            jsDir: karmaJsDir
        })

    mix
    .copy(fontsOutputFolder, buildPath + '/fonts')
});
