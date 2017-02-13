/*!
 * gulp
 *
 * To install dependencies listed in package.json:
 * 1. cd to the directory containing the package.json
 * 2. type: npm install
 *
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
	realFavicon = require ('gulp-real-favicon'),
	fs = require('fs'),
    browserSync = require('browser-sync').create();

// Project directories
var config = {
    bootstrapDir: './node_modules/bootstrap-sass',
    jQueryDir: './node_modules/jquery',
    publicDir: './build',
    projectScssDir: './src/scss',
    projectJsDir: './src/js',
    projectImgDir: './src/images',
    projectTemplateDir: './src/templates',
	projectTitle: 'Website Title'
};

// Start browserSync server
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
          baseDir: config.publicDir
        }
    });
});

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
	realFavicon.generateFavicon({
		masterPicture: config.projectImgDir + '/favicon-master.png',
		dest: config.publicDir,
		iconsPath: '/',
		design: {
			ios: {
				pictureAspect: 'noChange',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#da532c',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					name: config.projectTitle,
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'blackAndWhite',
				threshold: 50,
				themeColor: '#5bbad5'
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', ['generate-favicon'], function() {
	return gulp.src([ config.projectTemplateDir + '/favicon.html' ])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest( config.projectTemplateDir + '/rendered' ));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
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
        precision: 8,
        style: 'compressed',
        includePaths: [config.bootstrapDir + '/assets/stylesheets']
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: [
            "Android 2.3",
            "Android >= 4",
            "Chrome >= 20",
            "Firefox >= 24",
            "Explorer >= 8",
            "iOS >= 6",
            "Opera >= 12",
            "Safari >= 6"
        ]
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleancss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.publicDir + '/assets/css'))
    .pipe(browserSync.reload({ // Reloading with Browser Sync
         stream: true
     }));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
        config.jQueryDir + '/dist/jquery.min.js',
		//config.bootstrapDir + '/assets/javascripts/bootstrap/transition.js',
		//config.bootstrapDir + '/assets/javascripts/bootstrap/alert.js',
		//config.bootstrapDir + '/assets/javascripts/bootstrap/button.js',
		//config.bootstrapDir + '/assets/javascripts/bootstrap/carousel.js',
		//config.bootstrapDir + '/assets/javascripts/bootstrap/collapse.js',
		//config.bootstrapDir + '/assets/javascripts/bootstrap/dropdown.js',
		//config.bootstrapDir + '/assets/javascripts/bootstrap/modal.js',
		//config.bootstrapDir + '/assets/javascripts/bootstrap/tab.js',
		//config.bootstrapDir + '/assets/javascripts/bootstrap/affix.js',
		//config.bootstrapDir + '/assets/javascripts/bootstrap/scrollspy.js',
		//config.bootstrapDir + '/assets/javascripts/bootstrap/tooltip.js',
		//config.bootstrapDir + '/assets/javascripts/bootstrap/popover.js',
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
gulp.task('default', ['lint', 'scripts', 'scss', 'fonts', 'browserSync', 'watch', 'generate-favicon', 'inject-favicon-markups']);
