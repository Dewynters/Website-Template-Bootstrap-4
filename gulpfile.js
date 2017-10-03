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
//     bootstrapDir: './node_modules/bootstrap-sass',
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
        precision: 8,
        style: 'compressed'
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
