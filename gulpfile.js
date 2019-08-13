var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

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
})

// 清理
gulp.task('clean', function() {
  return gulp.src(['src/css', 'src/maps'], { read: false })
    .pipe(plugins.clean())
});
