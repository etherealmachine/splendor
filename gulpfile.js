var gulp = require('gulp');
var webserver = require('gulp-webserver');
var vulcanize = require('gulp-vulcanize');
 
gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      fallback: 'index.html',
      port: 8080
    }));
});
 
gulp.task('vulcanize', function() {
  return gulp.src('index.html')
    .pipe(vulcanize({
      abspath: '.',
      inlineScripts: true,
      inlineCss: true,
      inputUrl: '../../../../index.html'
    }))
    .on('error', function(err) { console.log( err ); })
    .pipe(gulp.dest('dist'));
});
