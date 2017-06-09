'use strict';

var gulp         = require('gulp');
var csso         = require('gulp-csso');
var uglify       = require('gulp-uglify');
var imagemin     = require('gulp-imagemin');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserify   = require('browserify');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var browserSync  = require('browser-sync').create();
var clean        = require('gulp-clean');

gulp.task('html', function() {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: [
      'Android >= 2.3',
      'BlackBerry >= 7',
      'Chrome >= 9',
      'Firefox >= 4',
      'Explorer >= 9',
      'iOS >= 5',
      'Opera >= 11',
      'Safari >= 5',
      'OperaMobile >= 11',
      'OperaMini >= 6',
      'ChromeAndroid >= 9',
      'FirefoxAndroid >= 4',
      'ExplorerMobile >= 9'
     ]}))
    .pipe(csso())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('bundle', function() {
  browserify("./src/app/app.js")
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./dist/app/'))
    .pipe(browserSync.stream());
});

gulp.task('img', function() {
  return gulp.src('./src/**/*.{jpg,png,svg,gif}')
    .pipe(imagemin({
      verbose: true,
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('fonts', function() {
  return gulp.src('./node_modules/material-design-iconic-font/dist/fonts/*')
    .pipe(gulp.dest('./dist/fonts'))
});

gulp.task('flags', function() {
  return gulp.src('./node_modules/famfamfam-flags/dist/sprite/famfamfam-flags.png')
    .pipe(gulp.dest('./dist/img'))
});

// TODO: move to img folder
gulp.task('gallery-icons', function() {
  return gulp.src('./node_modules/ng-image-gallery/res/icons/**/*.{jpg,png,svg,gif}')
    .pipe(gulp.dest('./dist/res/icons'));
});

gulp.task('l10n', function() {
  return gulp.src('./src/app/translations/*')
    .pipe(gulp.dest('./dist/app/translations'));
});

gulp.task('serve', ['default'], function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    startPath: "/"
  });
  gulp.watch('./dist/**').on('change', browserSync.reload);
});

gulp.task('clean', function () {
  return gulp.src('./dist', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('copy', function() {
  var objects = [
    './src/**',
    '!./src/sass', '!./src/sass/**',
    '!./src/js', '!./src/js/**',
    '!./src/app', '!./src/app/**',
    '!./src/img', '!./src/img/**',
    '!./src/fonts', '!./src/fonts/**'
  ];
  return gulp.src(objects, {dot: true})
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function(){
  gulp.watch('src/**/*.html', {cwd: './'}, ['html']);
  gulp.watch('src/app/**/*.js', {cwd: './'}, ['bundle']);
  gulp.watch('src/sass/**/*.{sass,scss}', {cwd: './'}, ['sass']);
  gulp.watch('src/img/*.{jpg,png,svg,gif}', ['img']);
  gulp.watch('src/app/translations/*', ['l10n']);
});

gulp.task('default', ['copy', 'html', 'sass', 'bundle', 'img', 'fonts', 'flags', 'gallery-icons', 'l10n', 'watch']);