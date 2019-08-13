## 安装gulp
```
npm install gulp --save-dev
```
## 安装gulp-load-plugins
```
npm install gulp-load-plugins
```
```js
var plugins = require('gulp-load-plugins')();
```
> 通过这个插件，可以将以gulp-开头的插件自动注入到plugins中。比如安装了gulp-sass插件，通过plugins.sass()就可以调用

## 解析scss，自动添加前缀，并追踪源文件
```bash
npm install gulp-sass node-sass gulp-sourcemaps gulp-autoprefixer --save-dev
```
```js
gulp.task('scss', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer())
    .pipe(plugins.sourcemaps.write('../maps'))
    .pipe(gulp.dest('src/css'))
})
```

## 清理文件夹
```bash
npm install gulp-clean --save-dev
```
```
gulp.task('clean', function() {
  return gulp.src(['src/css', 'src/maps'], { read: false })
    .pipe(plugins.clean())
});
```

## 开启静态资源服务器browserSync，实现热启动
```
npm install browser-sync --save-dev
```
```js
var browserSync = require('browser-sync').create()

gulp.task('serve', ['clean'], function() {
  browserSync.init({
    server: 'src',
    port: 8080
  });

  // 在js和scss任务的底部追加.pipe(browserSync.stream())，以保证能够在serve中被正常监听
  // watch的时候不要使用相对路径，不然无法监听新生成的文件
  gulp.watch('src/scss/**/*.scss', ['scss']);
  gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});
```
虽然上面的js可以通过babel解析，但由于含有require语句，还是无法直接在页面中使用，因此直接监听了js文件夹

## 复制文件到dist文件夹
```js
gulp.task('copy', ['scss'], function() {
  gulp.src(['src/**/*', '!src/scss/**/*', '!src/maps/**/*'], { nodir: true})
    .pipe(gulp.dest('dist'))
})
// nodir表示忽略空的目录，不然会生成空的scss和maps目录
```

## 删除dist文件夹
```js
gulp.task('cleanDist', function() {
  return gulp.src('dist', { read: false })
    .pipe(plugins.clean())
})
```
