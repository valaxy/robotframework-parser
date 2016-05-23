import {chunk,any,rangeOf,anyOf,subRule,zeroOrMore,oneOrMore,optional,sequence,label} from 'pegjs-builder/lib/peg/patterns'

// [a-zA-Z_][a-zA-Z0-9_ ]*

export = {
    isToken: true,

    isIgnore: false,

    name: 'testCaseName',

    body: [
        sequence(
            anyOf(
                rangeOf('a', 'z'),
                rangeOf('A', 'Z'),
                chunk('_')
            ),
            oneOrMore(anyOf(
                rangeOf('a', 'z'),
                rangeOf('A', 'Z'),
                rangeOf('0', '9'),
                chunk('_ ')
            ))
        )
    ]
}