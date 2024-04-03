const {
  src,
  dest,
  watch,
  parallel
} = require("gulp");

//CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const soursemaps = require("gulp-sourcemaps");

//Imágenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

// javascript
const tercer = require("gulp-terser-js");

function css(done) {
  src("src/scss/**/*.scss") // Identificar en archivo SASS
    .pipe(soursemaps.init())
    .pipe(plumber())
    .pipe(sass()) // Compilar
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(soursemaps.write("."))
    .pipe(dest("build/css")); // Almacenarla en el disco duro
  done(); // Callback que avisa a gulp cuando llegamos al final
}

function imagenes(done) {
  const opciones = {
    optimizationLevel: 3
  }

  src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"))

  done();
}

function versionWebp(done) {
  const opciones = {
    quality: 50
  };

  src("src/img/**/*.{png,jpg}")
    .pipe(webp(opciones))
    .pipe(dest("build/img"))
  done();
}


function versionAvif(done) {
  const opciones = {
    quality: 50
  };

  src("src/img/**/*.{png,jpg}")
    .pipe(avif(opciones))
    .pipe(dest("build/img"))
  done();
}

function javascript(done) {
  src("src/js/**/*.js")
    .pipe(soursemaps.init())
    .pipe(tercer())
    .pipe(soursemaps.write("."))
    .pipe(dest("build/js"))

  done();
}



function dev(done) {
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", javascript);
  done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(css, imagenes, versionWebp, versionAvif, javascript, dev);