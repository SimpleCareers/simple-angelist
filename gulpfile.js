'use strict';
// generated on 2014-06-24 using generator-gulp-webapp 0.1.0

var gulp = require('gulp');
var plumber = require('gulp-plumber');

// load plugins
var $ = require('gulp-load-plugins')();

var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

var jade = require('gulp-jade');

gulp.task('templates', function() {
  var YOUR_LOCALS = {};

  gulp.src('app/*.jade')
    .pipe(plumber())
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true
    }))
    .pipe(gulp.dest('app/'))
  
  gulp.src('app/views/**/*.jade')
    .pipe(plumber())
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true
    }))
    .pipe(gulp.dest('app/views/'))
});

gulp.task('coffee', function() {
  gulp.src('app/scripts/app.coffee', { read: false })
    .pipe(plumber())
    .pipe(browserify({
      transform: ['coffeeify'],
      extensions: ['.coffee']
    }))
    .pipe(rename('main.js'))
    .pipe(gulp.dest('app/scripts/'))
});

gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe(plumber())
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.size());
});

gulp.task('scripts', ['coffee'], function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe(plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe(gulp.dest('dist/scripts'))
        .pipe($.size());
});

gulp.task('html', ['templates', 'styles', 'scripts'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
        .pipe(plumber())
        .pipe($.useref.assets({searchPath: '{.tmp,app}'}))
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe(plumber())
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

gulp.task('libfonts', function () {
    return gulp.src('app/fonts/**/*')
        .pipe(plumber())
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

gulp.task('fonts', function () {
    return $.bowerFiles()
        .pipe(plumber())
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

gulp.task('views', function () {
    return gulp.src('app/views/**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('dist/views'))
        .pipe($.size());
});

gulp.task('extras', function () {
    return gulp.src(['app/*.*', '!app/*.html', '!app/*.jade'], { dot: true })
        .pipe(plumber())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false })
        .pipe(plumber())
        .pipe($.clean());
});
gulp.task('libs', function () {
    return gulp.src(['app/libs/**/*.*'])
        .pipe(plumber())
        .pipe(gulp.dest('dist/libs'))
        .pipe($.size());
});

gulp.task('build', ['html', 'libs', 'images', 'libfonts', 'fonts', 'views', 'extras']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('app'))
        .use(connect.static('.tmp'))
        .use(connect.directory('app'));

    require('http').createServer(app)
        .listen(8080)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:8080');
        });
});

gulp.task('serve', ['build', 'connect', 'styles'], function () {
    require('opn')('http://localhost:8080');
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.scss')
        .pipe(plumber())
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
        .pipe(plumber())
        .pipe(wiredep({
            directory: 'app/bower_components',
            exclude: ['bootstrap-sass-official']
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('watch', ['connect', 'serve'], function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
        'app/*.html',
        '.tmp/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*',
        'app/libs/**/*',
        'app/views/**/*'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('app/views/**/*.jade', ['html']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.coffee', ['scripts']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});
