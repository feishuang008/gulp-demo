var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

gulp.task('plugins', function() {
  console.log(plugins);
})

// 解析SCSS
gulp.task('scss', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer())
    .pipe(plugins.sourcemaps.write('../maps'))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream())
})

// 清理
gulp.task('clean', function() {
  return gulp.src(['src/css', 'src/maps', 'src/scripts'], { read: false })
    .pipe(plugins.clean())
});

// 开启静态资源服务器browserSync
gulp.task('serve', ['scss'], function() {
  browserSync.init({
    server: 'src',
    port: 8080
  });

  gulp.watch('src/scss/**/*.scss', ['scss']);
  gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});
