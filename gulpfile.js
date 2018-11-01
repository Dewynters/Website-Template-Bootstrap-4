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
	bootstrapDir: './src/js/bootstrap',
	jQueryDir: './node_modules/jquery',
	popperDir: './node_modules/popper.js',
	publicDir: './templates',
	devTemplateDir: './templates',
	projectScssDir: './src/scss',
	projectJsDir: './src/js'
};

// Start browserSync server
gulp.task('browserSync', function (done) {
	browserSync.init({
		server: {
			baseDir: config.devTemplateDir
		}
	});
	done();
});

function browserSyncReload(done) {
	browserSync.reload();
	done();
}

// Lint Task
gulp.task('lint', function () {
	return gulp.src(config.projectJsDir + '/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Compile our scss
gulp.task('scss', function () {
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
				// 'Chrome >= 45', // Exact version number here is kinda arbitrary
				// 'Firefox ESR',
				// // Note: Edge versions in Autoprefixer & Can I Use refer to the EdgeHTML rendering engine version,
				// // NOT the Edge app version shown in Edge's "About" screen.
				// // For example, at the time of writing, Edge 20 on an up-to-date system uses EdgeHTML 12.
				// // See also https://github.com/Fyrd/caniuse/issues/1928
				// 'Edge >= 12',
				// 'Explorer >= 10',
				// // Out of leniency, we prefix these 1 version further back than the official policy.
				// 'iOS >= 9',
				// 'Safari >= 9',
				// // The following remain NOT officially supported, but we're lenient and include their prefixes to avoid severely breaking in them.
				// 'Android >= 4.4',
				// 'Opera >= 30'
				"Chrome >= 45",
				"Firefox >= 24",
				"Explorer >= 10",
				"iOS >= 7",
				"Safari >= 8",
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
		.pipe(gulp.dest(config.devTemplateDir + '/assets/css'))
		.pipe(browserSync.stream());
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
	return gulp.src([
		config.jQueryDir + '/dist/jquery.min.js',
		/** 
		 * UNCOMMENT POPPER.JS, INDEX.JS AND UTIL.JS IF USING ANY BOOTSTRAP JS BELOW
		 * **/
		// config.popperDir + '/dist/umd/popper.min.js',
		// config.bootstrapDir + '/index.js',
		// config.bootstrapDir + '/alert.js',
		// config.bootstrapDir + '/button.js',
		// config.bootstrapDir + '/carousel.js',
		// config.bootstrapDir + '/collapse.js',
		// config.bootstrapDir + '/dropdown.js',
		// config.bootstrapDir + '/modal.js',
		// config.bootstrapDir + '/popover.js',
		// config.bootstrapDir + '/scrollspy.js',
		// config.bootstrapDir + '/tab.js',
		// config.bootstrapDir + '/tooltip.js',
		// config.bootstrapDir + '/util.js',
		config.projectJsDir + '/vendor/*.js',
		config.projectJsDir + '/*.js',
	])
		.pipe(plumber())
		.pipe(concat('main.js'))
		.pipe(gulp.dest(config.publicDir + '/assets/js'))
		.pipe(rename('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(config.publicDir + '/assets/js'))
		.pipe(gulp.dest(config.devTemplateDir + '/assets/js'))
		.pipe(browserSync.stream());
});

gulp.task('fonts', function () {
	return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
		.pipe(gulp.dest(config.devTemplateDir + '/assets/fonts'))
		.pipe(gulp.dest(config.publicDir + '/assets/fonts'));
});

// Watch Files For Changes
gulp.task('watch', gulp.series('browserSync', function (done) {
	gulp.watch(config.projectJsDir + '/**/*.js', gulp.series('lint', 'scripts'));
	gulp.watch(config.projectScssDir + '/**/*.scss', gulp.series('scss'));

	gulp.watch(
		[
			config.devTemplateDir + '/**/*',
			config.publicDir + '/**/*'
		],
		gulp.series(browserSyncReload)
	);
	done();
}));

// Default Task
gulp.task('default', gulp.series('lint', 'scripts', 'scss', 'fonts', gulp.parallel('watch')));
