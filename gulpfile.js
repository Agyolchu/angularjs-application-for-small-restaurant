/**
 * Created by agilyolchuyev on 19/01/2017.
 */
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    del = require('del');
var ngannotate = require('gulp-ng-annotate');

gulp.task('jshint', function() {
    return gulp.src('public/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// Clean
gulp.task('clean', function() {
    return del(['dist']);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('usemin', 'imagemin','copyfonts');
});
//Usemin
gulp.task('usemin',['jshint'], function () {
    return gulp.src('./public/index.html')
        .pipe(usemin({
            css:[minifycss(),rev()],
            js: [ngannotate(),uglify(),rev()]
        }))
        .pipe(gulp.dest('dist/'));
});

// Images
gulp.task('imagemin', function() {
    return del(['dist/images']), gulp.src('public/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

// Copying fonts
gulp.task('copyfonts', ['clean'], function() {
    gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
        .pipe(gulp.dest('./dist/fonts'));
    gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
        .pipe(gulp.dest('./dist/fonts'));
});

// Watch
gulp.task('watch', ['browser-sync'], function() {
    // Watch .js files
    gulp.watch('{public/scripts/**/*.js,public/styles/**/*.css,public/**/*.html}', ['usemin']);
    // Watch image files
    gulp.watch('public/images/**/*', ['imagemin']);

});

// Browser Sync
gulp.task('browser-sync', ['default'], function () {
    var files = [
        'public/**/*.html',
        'public/styles/**/*.css',
        'public/images/**/*.png',
        'public/scripts/**/*.js',
        'dist/**/*'
    ];

    browserSync.init(files, {
        server: {
            baseDir: "dist",
            index: "index.html"
        }
    });

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', browserSync.reload);
});
