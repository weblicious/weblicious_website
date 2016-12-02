var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence');

// demarrage server browserSync
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });
});

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.{scss,sass,css}')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['bower_components/compass-mixins/lib/', 'bower_components/susy/sass/']
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    // Relance le navigateur quand l'HTML ou un fichier JS change
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('useref', function() {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cleanCSS({compatibility: 'ie8'})))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        // met en cache les images passées dans imagemin
        .pipe(cache(imagemin({
          interlaced: true
        })))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean', function() {
  return del.sync('dist').then(function(callback) {
    return cache.clearAll(callback);
  });
})

gulp.task('clean:dist', function() {
    return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass',
    ['useref', 'images', 'fonts'],
    callback
  )
});

gulp.task('default', function(callback) {
  runSequence(
    ['sass', 'browserSync', 'watch'],
    callback
  )
});