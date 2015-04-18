var gulp       = require( 'gulp' );
var react      = require( 'gulp-react' );
var concat     = require( 'gulp-concat' );
var browserify = require( 'gulp-browserify' );
var shell      = require( 'gulp-shell' );
var path       = require( 'path' );
var args       = require( 'yargs' ).argv;
var babel      = require('gulp-babel');

var PORT = args.p || args.port || 8001;

// ===========================================================//
// ======================== React ============================//
// ===========================================================//

/**
 * Compiles all jsx components. 
 */
gulp.task( 'compile-components', function () {
    return gulp
        .src( 'src/js/components/*.jsx' ) 
        .pipe( react() ) 
        .pipe( gulp.dest( 'src/js/components/compiled/' ) );
});


// ===========================================================//
// ======================== Demo =============================//
// ===========================================================//

/**
 * To build "browserify" demo, execute
 * `gulp build-demo`
 */
gulp.task( 'build-demo', [ 'compile-components' ], function () {
    return gulp.src( 'src/js/main.js' )
               .pipe( react() )
               .pipe( browserify() )
               // .pipe( babel() )
               .pipe( concat( 'main.js' ) )
               .pipe( gulp.dest( 'dist/client/js/' ) );
});


/**
 * To run demo, execute
 * `gulp demo`
 */
gulp.task( 'demo', [ 'build-demo' ], shell.task([
    'node ' + path.normalize( './app.js' ) + ' --port=' + PORT
], { cwd: './dist/' }));


