const gulp = require("gulp");
const sass = require('gulp-sass'); //kompiluje scss do css
const sourcemaps = require('gulp-sourcemaps'); //w debugerze pokazuje nam w którym miejscu mamy poprawić w scss a nie w css
const autoprefixer = require('gulp-autoprefixer'); //dodaje prefixy dla starszych przegladarek - zasieg ustalamy w pliku package.json w czesci - "browserslist": ["> 5%","last 2 versions"]
const browserSync = require('browser-sync').create(); //automatyczne odswierzanie okna przegladarki
const notifier = require('node-notifier'); //wyswietla komunikaty o bledach w okienku powiadomien

function myError(error) {
    console.log(error.formatted);

    notifier.notify({
        title: 'Błąd',
        message: error.formatted
    });
}

sass.compiler = require('node-sass');

function server(cb) {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    cb();

}


function css() {
    return gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "expanded" //nested,expanded,compact,compressed
        }).on('error', myError))
        .pipe(autoprefixer({}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

function watch(cb) {
    gulp.watch('./scss/**/*.scss', gulp.series(css));
    gulp.watch("./*.html").on('change', browserSync.reload);
    cb();
}
exports.watch = watch;
exports.css = css;
exports.default = gulp.series(server, css, watch);