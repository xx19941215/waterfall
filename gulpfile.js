		
		'use strict';
		/*
		1.LESS编译 压缩 合并
		2.JS合并 压缩 混淆
		3.img复制
		4.html压缩
		 */
		 
		//在gulpfile.js先载入gulp包
		var gulp = require("gulp");
		var less = require("gulp-less");
		var cssnano = require("gulp-cssnano");
		var concat = require("gulp-concat");
		var uglify = require('gulp-uglify');
		var rename = require('gulp-rename');
		//1.LESS编译 压缩 合并
		gulp.task('style',function () {
		    //这里是在执行style任务时自动执行的
			gulp.src(["src/styles/waterfall.less"]).pipe(less()).pipe(gulp.dest('dist/styles')).pipe(browserSync.reload({stream:true}));
		    gulp.src(["src/styles/waterfall.less"]).pipe(less()).pipe(cssnano()).pipe(rename('waterfall.min.css')).pipe(gulp.dest('dist/styles')).pipe(browserSync.reload({stream:true}));
		})
		//2.JS合并 压缩 混淆
		gulp.task('script',function(){
		    gulp.src('src/scripts/waterfall.js').pipe(gulp.dest('dist/scripts/')).pipe(browserSync.reload({stream:true}));
			gulp.src('src/scripts/waterfall.js').pipe(uglify()).pipe(rename('waterfall.min.js')).pipe(gulp.dest('dist/scripts/')).pipe(browserSync.reload({stream:true}));

		})
		//3.图片复制
		gulp.task('image',function(){
		    gulp.src('src/images/*.*').pipe(gulp.dest('dist/images/')).pipe(browserSync.reload({stream:true}));
		})
		var htmlmin = require('gulp-htmlmin');
		//4.HTML处理
		gulp.task('html',function(){
		    gulp.src('src/*.html').pipe(htmlmin({collapseWhitespace:false,removeComments:true})).pipe(gulp.dest('dist/')).pipe(browserSync.reload({
		        stream:true
		    }));
		})
		//浏览器监视
		var browserSync = require("browser-sync")
		gulp.task('serve',function(){
		    browserSync({
		        server:{
		            baseDir:["./"]
		        }
		 
		    },function(err,bs){
		        console.log(bs.options.getIn(["urls","local"]));
		        gulp.watch('src/styles/*.less',['style']);
		        gulp.watch('src/scripts/*.js',['script']);
		        gulp.watch('src/images/*.*',['image']);
		        gulp.watch('src/*.html',['html']);
		 
		    })

})