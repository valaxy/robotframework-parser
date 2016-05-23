const gulp = require('gulp')
const gutil = require('gulp-util')
const through = require('through2')
const watch = require('gulp-watch')

module.exports = function (options) {
	var taskName = options.taskName || 'copy'
	var paths = options.paths
	var destPath = options.destPath

	var pipeStream = function (stream) {
		return stream
			.pipe(gulp.dest(destPath))
			.pipe(through.obj((file, options, callback) => {
				gutil.log(`${taskName} ${file.relative}`)
				callback(null, file)
			}))
	}

	gulp.task(taskName, () => {
		return pipeStream(gulp.src(paths, {base: './'}))
	})

	gulp.task(`${taskName}:watch`, () => {
		return pipeStream(gulp.src(paths, {base: './'}).pipe(watch(paths, {base: './'})))
	})
}

