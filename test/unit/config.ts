requirejs.config({
    baseUrl: '../../',
    paths  : {
        'cjs'          : 'node_modules/cjs/cjs',
        'amd-loader'   : 'node_modules/amd-loader/amd-loader',
        'underscore'   : 'node_modules/underscore/underscore',
        'pegjs'        : 'node_modules/pegjs',
        'pegjs-builder': 'node_modules/pegjs-builder',
        'text'         : 'node_modules/text/text'
    },
    cjs    : {
        cjsPaths: [
            'pegjs-builder',
            'pegjs'
        ]
    }
})