const gulp = require('gulp');

gulp.task('build', function() {
  return [
    gulp.src([
      './dist/MeteoLook/*',
    ])
    .pipe(gulp.dest('./mobile/www')),
    gulp.src([
      './dist/MeteoLook/assets/images/DSIcons/*',
    ])
    .pipe(gulp.dest('./mobile/www/assets/images/DSIcons'))
  ]
});
