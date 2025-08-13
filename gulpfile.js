const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

// gulp-imagemin v8 (ESM) — usar .default e plugins separados
const imagemin = require('gulp-imagemin').default;
const mozjpeg  = require('imagemin-mozjpeg');
const optipng  = require('imagemin-optipng');
const gifsicle = require('imagemin-gifsicle');
const svgo     = require('imagemin-svgo');

const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const { deleteAsync } = require('del');

const paths = {
  styles:  { src: 'src/scss/**/*.scss',                        dest: 'dist/css'     },
  scripts: { src: 'src/js/**/*.js',                            dest: 'dist/js'      },
  images:  { src: 'src/images/**/*.{jpg,jpeg,png,gif,svg,webp}', dest: 'dist/images' }
};

function clean() {
  return deleteAsync(['dist/**', '!dist']);
}

function styles() {
  return src(paths.styles.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.styles.dest));
}

function scripts() {
  return src(paths.scripts.src, { sourcemaps: true })
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths.scripts.dest, { sourcemaps: '.' }));
}

function images() {
  return src(paths.images.src)
    .pipe(
      imagemin([
        mozjpeg({ quality: 80, progressive: true }),
        optipng({ optimizationLevel: 5 }),
        gifsicle({ interlaced: true }),
        // svgo com preset-default para evitar warnings
        svgo({ plugins: [{ name: 'preset-default' }] })
      ])
    )
    .pipe(dest(paths.images.dest));
}

function watcher() {
  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.images.src, images);
}

const build = series(clean, parallel(styles, scripts, images));

exports.clean   = clean;
exports.styles  = styles;
exports.scripts = scripts;
exports.images  = images;
exports.watch   = watcher;
exports.build   = build;
exports.default = series(build, watcher);
