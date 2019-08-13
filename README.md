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

