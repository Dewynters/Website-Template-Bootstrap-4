/*!
 * gulp
 *
 * To install dependencies listed in package.json:
 * 1. cd to the directory containing the package.json
 * 2. type: npm install
 */

// Include gulp and plugins 
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleancss = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create();

// Project directories
var config = {
    bootstrapDir: './node_modules/bootstrap',
    jQueryDir: './node_modules/jquery',
    publicDir: './build',
    projectScssDir: './src/scss',
    projectJsDir: './src/js'
};

// Start browserSync server
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
          baseDir: config.publicDir
        }
    });
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src(config.projectJsDir + '/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile our scss
gulp.task('scss', function() {
    return gulp.src(config.projectScssDir + '/main.scss')
	.pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: [
	        // Official browser support policy:
	        // https://v4-alpha.getbootstrap.com/getting-started/browsers-devices/#supported-browsers
	        //
	        'Chrome >= 45', // Exact version number here is kinda arbitrary
	        'Firefox ESR',
	        // Note: Edge versions in Autoprefixer & Can I Use refer to the EdgeHTML rendering engine version,
	        // NOT the Edge app version shown in Edge's "About" screen.
	        // For example, at the time of writing, Edge 20 on an up-to-date system uses EdgeHTML 12.
	        // See also https://github.com/Fyrd/caniuse/issues/1928
	        'Edge >= 12',
	        'Explorer >= 10',
	        // Out of leniency, we prefix these 1 version further back than the official policy.
	        'iOS >= 9',
	        'Safari >= 9',
	        // The following remain NOT officially supported, but we're lenient and include their prefixes to avoid severely breaking in them.
	        'Android >= 4.4',
	        'Opera >= 30'
        ]
    }))
	// Output main.css
	.pipe(gulp.dest(config.publicDir + '/assets/css'))
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleancss())
    .pipe(sourcemaps.write('.'))
	// Output main.min.css
    .pipe(gulp.dest(config.publicDir + '/assets/css'))
    .pipe(browserSync.reload({ // Reloading with Browser Sync
         stream: true
     }));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
        config.jQueryDir + '/dist/jquery.min.js',
		// Include any bootstrap JS here
		//config.bootstrapDir + '/js/dist/alert.js',
		//config.bootstrapDir + '/js/dist/button.js',
		//config.bootstrapDir + '/js/dist/carousel.js',
		//config.bootstrapDir + '/js/dist/collapse.js',
		//config.bootstrapDir + '/js/dist/dropdown.js',
		//config.bootstrapDir + '/js/dist/modal.js',
		//config.bootstrapDir + '/js/dist/popover.js',
		//config.bootstrapDir + '/js/dist/scrollspy.js',
		//config.bootstrapDir + '/js/dist/tab.js',
		//config.bootstrapDir + '/js/dist/tooltip.js',
		//config.bootstrapDir + '/js/dist/util.js'
        config.projectJsDir + '/vendor/*.js',
        config.projectJsDir + '/*.js',
    ])
	.pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(config.publicDir + '/assets/js'))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.publicDir + '/assets/js'))
    .pipe(browserSync.reload({ // Reloading with Browser Sync
        stream: true
     }));
});

gulp.task('fonts', function() {
    return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
    .pipe(gulp.dest(config.publicDir + '/assets/fonts'));
});

// Watch Files For Changes
gulp.task('watch', ['browserSync'], function() {
    gulp.watch(config.projectJsDir + '/**/*.js', ['lint', 'scripts']);
    gulp.watch(config.projectScssDir + '/**/*.scss', ['scss']);
    gulp.watch(config.publicDir + '/**/*.html').on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'scss', 'fonts', 'browserSync', 'watch']);
