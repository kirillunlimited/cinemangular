'use strict';

var gulp         = require('gulp');

var csso         = require('gulp-csso');
var uglify       = require('gulp-uglify');
var imagemin     = require('gulp-imagemin');

var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserify   = require('browserify');
var babelify     = require('babelify');
// to make it work with jsx - 'npm install save-dev babel-preset-react babel-preset-es2015'
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var browserSync  = require('browser-sync').create();

var jshint       = require('gulp-jshint');

var clean        = require('gulp-clean');
var runSequence  = require('run-sequence');

gulp.task('html', function() {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('php', function() {
  return gulp.src('./src/**/*.php')
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

gulp.task('lint', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
gulp.task('js', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});
gulp.task('bundle', function() {
  browserify("./src/js/app.js")
    // .transform(babelify, {presets: ["es2015", "react"]})
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./dist/js/'))
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

gulp.task('serve', ['default'], function() {
  // browserSync.init({
  //   server: {
  //     baseDir: "./"
  //   },
  //   startPath: "/dist"
  // });
  browserSync.init({
    proxy: "kinoshka"
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
    '!./src/img', '!./src/img/**'
  ];
  return gulp.src(objects, {dot: true})
    .pipe(gulp.dest('./dist'));
});

var jsTaskName = 'bundle'; // js | bundle

gulp.task('watch', function(){
  gulp.watch('./src/**/*.html', ['html']);
  gulp.watch('./src/**/*.php', ['php']);
  gulp.watch('./src/js/**/*.js', [jsTaskName]);
  gulp.watch('./src/sass/**/*.{sass,scss}', ['sass']);
  // gulp.watch('./src/jsx/**/*.{js,jsx}',['browserify']);
});

gulp.task('build', function() {
  runSequence('clean', 'copy', 'html', 'php', 'sass', jsTaskName, 'img');
});

gulp.task('default', ['html', 'php', 'sass', jsTaskName, 'watch']);