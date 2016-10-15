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
  return gulp.src('./src/sass/main.sass')
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

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    startPath: "/dist"
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
    '!./src/img', '!./src/img/**'
  ];
  return gulp.src(objects, {dot: true})
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function(){
  gulp.watch('./src/**/*.html', ['html']);
  gulp.watch('./src/app/**/*.js', ['bundle']);
  gulp.watch('./src/sass/**/*.{sass,scss}', ['sass']);
});

gulp.task('default', ['copy', 'html', 'sass', 'bundle', 'img', 'watch', 'serve']);