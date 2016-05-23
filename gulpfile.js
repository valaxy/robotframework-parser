require('./build/gulp/copy')({
	taskName: 'copy',
	paths   : [
		'lib/**/*',
		'test/**/*',
		'!**/*.ts'
	],
	destPath: 'dest'
})

require('./build/gulp/copy')({
	taskName: 'resource',
	paths   : ['node_modules/**/*'],
	destPath: 'dest'
})