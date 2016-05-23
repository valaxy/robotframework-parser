import {chunk,any,rangeOf,anyOf,subRule,zeroOrMore,oneOrMore,optional,sequence,label} from 'pegjs-builder/lib/peg/patterns'

// testCaseName endLine testCaseBody

export = {
    isToken: false,

    name: 'testCase',

    body: [
        sequence(
            subRule('testCaseName'),
            subRule('endLine'),
            subRule('testCaseBody')
        )
    ]
}