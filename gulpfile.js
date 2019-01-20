const browserSync = require('browser-sync');
const csso = require('gulp-csso');
const del = require('del');
const gulp = require('gulp');
const fs = require('fs');
const htmlmin = require('gulp-htmlmin');
const path = require('path');

let params = {
    buildDir: './build/',
    srcDir: './src/'
}

/**
 * очистка папки деплоя
 */
function clean(done) {
    del(params.buildDir);
    done();
}

/**
 * копирование файлов деплоя
 */
function copyImages(done){
    gulp.src(params.srcDir+'**/*.jpg')
        .pipe(gulp.dest(params.buildDir));
    done();
}

function copyCss(done){
    gulp.src(params.srcDir+'**/*.css')
        .pipe(csso())
        .pipe(gulp.dest(params.buildDir));
    done();
}

function copyHtml(done){
    gulp.src(params.srcDir+'**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(params.buildDir));
    done();
}

/**
 * деплой проекта
 */
gulp.task('deploy', gulp.series(clean, gulp.parallel(copyImages, copyCss, copyHtml)));

/**
 * сервер для разработки
 */    
gulp.task('server', function(){
    let browserSyncSerser = browserSync.create();
    browserSyncSerser.init({
        server: {
            baseDir: './src/'
        }
    })
    gulp.watch('./src/**/*').on('change', browserSyncSerser.reload);
});