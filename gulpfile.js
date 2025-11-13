const {src, dest, watch, parallel, series} = require('gulp');       /*дозволяє gulp використовувати всі можливості gulp*/

const scss = require('gulp-sass')(require('sass')); /*підключення gulp-sass і sass*/
const concat = require('gulp-concat');   /*(concat обєднує разом всі файли css, і перейменовує папку в min*/
const uglify = require('gulp-uglify-es').default; /*зжимає файли js*/
const browserSync = require('browser-sync').create(); /*перегружає сторінку в реальному часі*/
const autoprefixer = require('gulp-autoprefixer'); /*добавляє префікси в стилях*/
const clean = require('gulp-clean'); /*кожен раз перезатирає папку dist*/


function styles() { /*функція яка працює зі стилями*/
    return src('app/scss/style.scss')  /*беруться файли з цієї папки*/
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version']}))      
    .pipe(concat('style.min.css')) /*(concat обєднує разом всі файли, і перейменовує папку в min після цього можна видаляти папку css, так як concat створив свою min.css */
    .pipe(scss({ outputStyle: 'compressed' })) /*зжимаються*/
    .pipe(dest('app/css'))  /*і вкладаються в цю папку*/
    .pipe(browserSync.stream()); /*перегружаєм сторінку*/
}

function scripts() { /*функція яка працює зі скриптами*/
    return src('app/js/main.js') /*беруться файли з цієї папки*/
        // 'ap/js/*.js',  /*якщо треба підключити всі файли в папці js*/
        // 'ap/js/**/ *.js',  /*якщо в папці js є ще папки і треба знайти всіх жителів*/
        // 'ap/js/**/ *.*',  /*якщо треба знайти всі файли незалежно від розширення*/
        // '!app/js/main.min.js' /*крім мініфікованого файлу. Якщо це не прописати, запуститься безкінечний цикл*/
        // також треба слідкувати щоб watching відслідковував всі папки  
    .pipe(concat('main.min.js')) /*(concat обєднує разом всі файли, і перейменовує папку в min*/
    .pipe(uglify())      /*зжимаються*/
    .pipe(dest('app/js'))  /*і вкладаються в цю папку*/
    .pipe(browserSync.stream()); /*перегружаєм сторінку*/
}

function watching() { /*слідкує за змінами в проекті вже вбудований в gulp автоматично, так що встановлювати не потрібно*/
    browserSync.init({
     server: {
           baseDir: "app/"
        }
    }); 
   watch(['app/scss/style.scss'], styles) /*слідкує за змінами в стилях*/
   watch(['app/js/main.js'], scripts) /*слідкує за змінами в скриптах*/
   watch(['app/**/*.html']).on('change', browserSync.reload); /*слідкує за змінами в html*/
}

function building() { /*створює папку яку вже можна передавати заказчику або викладати на хостінг*/
   return src([
    'app/css/style.min.css', /*забирає файл стилів */
    'app/js/main.min.js', /*забирає файл скриптів */
    'app/**/*.html' /*забирає всі html */
   ], {base: 'app'}) /*зберігає загальну структуру проекту */
    .pipe(dest('dist'))  /*вигружається все в папку dist*/
}

function cleanDist() {  /*кожен раз перезатирає папку dist*/
    return src('dist')
    .pipe(clean())
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;

exports.build = series(cleanDist, building); /*вбудована функція series задає порядок в якому будуть виповнятись функції*/
exports.default = parallel(styles, scripts, watching); /*paralell функція, яка вбудована в gulp автоматично, як і src, dest, watch, яка запускає всі функції паралельно*/

/*щоб запустити зборку, треба просто написати gulp в терміналі.ВАЖЛИВО!!!! Не оновлювати пакети, не оновлювати версію gulp.*/
// щоб повністю зжати проект, нажимаєм команду gulp build. Заказчику віддається або просто папка dist, або все крім node modules. Щоб почати новий проект, видаляємо все з папок styles.css, js.main.js, запускаємо команду gulp, щоб все очистилось з мініфіцированих файлів.
// удаляєм папаку node modules, package.log.json, і всі папки що знаходяться в папці dist. Потім нажимаєм npm i для устанвки пакетів.

