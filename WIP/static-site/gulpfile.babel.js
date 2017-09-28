var gulp = require('gulp');
// LiveReload
var connect = require('gulp-connect');

//Sass
var sass = require('gulp-sass');

// ES6
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
// JS
var uglify = require('gulp-uglify');

// Copy Index file over to dist
gulp.task('copy-index', function()  {
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
});

// Copy images over to dist
gulp.task('copy-images', function()  {
	gulp.src('src/images/**/*')
		.pipe(gulp.dest('dist/images'))
		.pipe(connect.reload());
});

// Copy images over to OAuth
gulp.task('copy-oauth', function()  {
	gulp.src('src/js/oauth.min.js')
		.pipe(gulp.dest('dist/js'))
		.pipe(connect.reload());
});

// Copy images over to dist
gulp.task('copy-video', function()  {
    gulp.src('src/video/**/*')
        .pipe(gulp.dest('dist/video'))
        .pipe(connect.reload());
});

// Copy interactive over to dist
gulp.task('copy-interactive', function()  {
    gulp.src('src/interactive/**/*')
        .pipe(gulp.dest('dist/interactive'))
        .pipe(connect.reload());
});

// Compile ES6 modules into app.js file
gulp.task('compile-es6', function () {
  return browserify({
    // Only need initial file, browserify finds the deps
    entries: 'src/js/es6/main.js',
    extensions: ['.js'],
    debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

// Setup servers and live reload
gulp.task('connect-dev', function () {
    connect.server({
        root: 'dist',
        port: 8000,
        livereload: true
    });
});

// Copy css over to dist, compile sass
gulp.task('compile-sass', function () {
  return gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

// WATCH
gulp.task('watch', function() {
	gulp.watch('src/*.html', ['copy-index']);
    gulp.watch('src/images/**/*', ['copy-images']);
    gulp.watch('src/js/oauth.min.js', ['copy-oauth']);
    gulp.watch('src/video/**/*', ['copy-video']);
    gulp.watch('src/interactive/**/*', ['copy-interactive']);
	gulp.watch('src/js/**/*', ['compile-es6']);
    gulp.watch('src/sass/*', ['compile-sass']);
});

gulp.task('default', ['connect-dev', 'watch']);

