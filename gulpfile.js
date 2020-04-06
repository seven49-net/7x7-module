var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var minify = require('gulp-minify');
var del = require("del");

var vars = {

  sassIn:["./scss/**/*.scss","./sass/**/*.scss"],
  cssOut:"./css/",
  jsIn: "./js/**/*.js",
  autoprefixerOptions: {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
  }
};

/*
https://stackoverflow.com/questions/36891227/run-gulp-from-child-directories
 process.chdir(process.env.INIT_CWD);
*/


gulp.task('sass', () => {
  process.chdir(process.env.INIT_CWD);
  return gulp
  .src(vars.sassIn)
  //.pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(autoprefixer(vars.autoprefixerOptions))
  //.pipe(sourcemaps.write("./"))
  .pipe(gulp.dest(vars.cssOut))
  .pipe(browserSync.stream());
});




gulp.task('browsersync', () => {
  process.chdir(process.env.INIT_CWD);
  browserSync.init({
    server: {
      baseDir: "./",
      index: ["index.htm", "index.html"]
    },
    browser: "google chrome canary"
  });
});


gulp.task('clean', function() {
  process.chdir(process.env.INIT_CWD);
   return del(["./dist/"]);
});

gulp.task("reload", function(done){
  browserSync.reload();
  done();
});



gulp.task('watch', gulp.parallel('browsersync', 'sass', () => {
  process.chdir(process.env.INIT_CWD);
  gulp.watch(vars.sassIn, gulp.series('sass'));
  gulp.watch('./**/*.html', gulp.series("reload"));
  gulp.watch('./js/**/*.js', gulp.series("reload"));
  gulp.watch('./vendor/**/*.js', gulp.series("reload"));
}));

