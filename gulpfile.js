var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-cssnano');
var rename = require('gulp-rename');
var sh = require('shelljs');
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')

var paths = {
  sass: ['./scss/ionic.app.scss', './scss/partials/*'],
  controllers: ['./www/js/controllers/*.js'],
  services: ['./www/js/services/*.js'],
  directives: ['./www/js/directives/*.js'],
  types: ['./www/js/types/*.js'],
  jsadt: ['./www/lib/js-adt/test/global.ut.js', './www/lib/js-adt/utils/structures/map/shim/weakmap.proto.js']
};

gulp.task('default', ['sass', 'js-adt', 'controllers', 'services', 'directives', 'types']);

gulp.task('controllers', function (done) {
  gulp.src(['./www/js/controllerModule.js', paths.controllers[0]])
      .pipe(sourcemaps.init())
      .pipe(concat('controllers.js'))
   //   .pipe(ngAnnotate())
      // .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./www/js'))
      .on('end', done);
});

gulp.task('services', function (done) {
  gulp.src(['./www/js/serviceModule.js', paths.services[0]])
      .pipe(sourcemaps.init())
      .pipe(concat('services.js'))
    //  .pipe(ngAnnotate())
      // .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./www/js'))
      .on('end', done);
});

gulp.task('directives', function (done) {
  gulp.src(['./www/js/directiveModule.js', paths.directives[0]])
      .pipe(sourcemaps.init())
      .pipe(concat('directives.js'))
     // .pipe(ngAnnotate())
      // .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./www/js'))
      .on('end', done);
});

gulp.task('types', function (done) {
  gulp.src(['./www/js/types.proto.js', paths.types[0]])
      .pipe(sourcemaps.init())
      .pipe(concat('types.js'))
     // .pipe(ngAnnotate())
      // .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./www/js'))
      .on('end', done);
});

gulp.task('js-adt', function (done) {
  gulp.src(['./www/js/types.proto.js', paths.jsadt[0], paths.jsadt[1]])
      .pipe(sourcemaps.init())
      .pipe(concat('js-adt.js'))
     // .pipe(ngAnnotate())
      // .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./www/js'))
      .on('end', done);
});


gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
      .pipe(sass({
        errLogToConsole: true
      }))
      .pipe(gulp.dest('./www/css/'))
      .pipe(minifyCss({
        keepSpecialComments: 0
      }))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest('./www/css/'))
      .on('end', done);
});
gulp.task('import-icons', function(){
  gulp.src('./www/img/icons/trips/')
      .pipe()
})
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.controllers, ['controllers']);
  gulp.watch(paths.services, ['services']);
  gulp.watch(paths.directives, ['directives']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
      .on('log', function(data) {
        gutil.log('bower', gutil.colors.cyan(data.id), data.message);
      });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
        '  ' + gutil.colors.red('Git is not installed.'),
        '\n  Git, the version control system, is required to download Ionic.',
        '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
        '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
