var gulp = require('gulp');
var nodemon = require('gulp-nodemon')


// var jshint = require('gulp-jshint');
// var jscs = require('gulp-jscs');
// var jsFiles = ['*.js', 'src/**/*.js'];

// gulp.task('style', function () {
//     return gulp.src(jsFiles)
//         .pipe(jshint)
//         .pipe(jshint.repoter('jshint-stylish', {
//             verbose: true
//         }))
//         .pipe(jscs())

// });

gulp.task('default', function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env:{
            PORT:'8000'
        },
        Ignore:'./node_modules/**'
    })
    .on('restart',function(){
        console.log('Restarting.')
    });
});