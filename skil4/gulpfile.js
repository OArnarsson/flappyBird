var gulp = require('gulp'),
    browserSync = require('browser-sync');

const $ = require('gulp-load-plugins')();
const reload = browserSync.reload;
const styleFolder = 'app/styles/'

gulp.task('styles', () => {
  return gulp.src(styleFolder + 'main.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
        outputStyle: 'expanded',
        precision: 10,
        includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    //.pipe(plugins.minifyCss(options.minifyCss))
    .pipe(gulp.dest(styleFolder))
    .pipe(reload({stream: true}));
});

gulp.task('watcher', ['styles'], () => {
    gulp.watch(styleFolder + '*.scss', ['styles']);
});

gulp.task('sync', ['styles'], () => {
    browserSync.init({
        server: {
          baseDir: "./app/"
        }
    });
    gulp.start('watcher');
});

gulp.task('default', ['watcher'], () => {
});