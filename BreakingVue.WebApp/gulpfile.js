var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('start-server', function () {
    exec('start cmd @cmd /k dotnet run', callback);
})

gulp.task('compile-test', function () {
    exec('start cmd @cmd /k npm run compile:test', callback);
})

gulp.task('compile-dev', function () {
    exec('start cmd @cmd /k npm run compile:dev', callback);
})

gulp.task('test-debug', function () {
    exec('start cmd @cmd /k npm run test:debug', callback);
})

gulp.task('coverage-watch', function(){
    exec('start cmd @cmd /k npm run coverage:debug', callback);
})

gulp.task('debug', gulp.parallel('start-server', 'compile-test', 'compile-dev', 'test-debug', 'coverage-watch'));

var callback = (error, stdout, stderr) => {
    if (error !== null)
        console.log('start-server' + ' ' + stderr);
    console.log('start-server' + ' ' + stdout);
}