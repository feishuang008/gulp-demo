var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

// 解析scss
gulp.task('scss', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer())
    .pipe(plugins.replace('../../images', '../images'))
    .pipe(plugins.sourcemaps.write('../maps'))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream())
})

// html任务
gulp.task('html', function() {
  return gulp.src(['./src/html/**/*.html', '!./src/html/template/**/*.html', '!./src/html/layout.html'])
    .pipe(plugins.plumber())
    .pipe(plugins.contentIncluder({
      includerReg: /<!\-\- include\s+"([^"]+)" \-\->/g
    }))
    .pipe(plugins.htmlmin({
      removeComments: true, //清除HTML注释
      collapseWhitespace: false, //压缩HTML
      collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
      minifyJS: false, //压缩页面JS
      minifyCSS: false //压缩页面CSS
    }))
    .pipe(plugins.replace(/(\.\.\/)+(.*?)\//g, '$2/'))
    .pipe(plugins.replace(/^(\s*)\n/gm, ''))
    .pipe(gulp.dest('src'))
    .pipe(browserSync.stream())
});

// 清理
gulp.task('clean', function() {
  return gulp.src(['src/maps', 'src/css'], { read: false })
    .pipe(plugins.clean())
});

// 热启动
gulp.task('server', ['scss'], function() {
  browserSync.init({
    server: 'src',
    port: 12138
  });

  gulp.watch('src/scss/**/*.scss', ['scss']);
  gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
  gulp.watch('src/html/**/*.html', ['html']);
})

