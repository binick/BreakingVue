var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('start-server', function () {
    exec('start cmd @cmd /k dotnet run', callback);
})

gulp.task('compile-test', function (done) {
    exec('start cmd @cmd /c npm run compile:test', (error, stdout, stderr) => {
        done();
    });
})

gulp.task('compile-dev', function (done) {
    exec('start cmd @cmd /c npm run compile:dev', (error, stdout, stderr) => {
        done();
    });
})

gulp.task('compile-coverage', function (done) {
    exec('start cmd @cmd /c npm run compile:coverage',(error, stdout, stderr) => {
        done();
    });
})

gulp.task('test-debug', function () {
    exec('start cmd @cmd /k npm run test:debug', callback);
})

gulp.task('coverage-watch', function () {
    exec('start cmd @cmd /k npm run coverage:debug', callback);
    require('kill')
})

gulp.task('debug', gulp.series(gulp.parallel('compile-test', 'compile-dev', 'compile-coverage'), gulp.parallel('start-server', 'test-debug', 'coverage-watch')));

var callback = (error, stdout, stderr) => {
    if (done != undefined)
        done();
    if (error !== null)
        console.log('start-server' + ' ' + stderr);
    console.log('start-server' + ' ' + stdout);
}