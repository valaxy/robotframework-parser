import {chunk,any,rangeOf,anyOf,subRule,zeroOrMore,oneOrMore,optional,sequence,label} from 'pegjs-builder/lib/peg/patterns'

// [ \t\r\n]*


export = {
    isToken: true,

    isIgnore: true,

    name: 'whitespace',

    body: [
        zeroOrMore(anyOf(
            chunk(' \t\r\n')
        ))
    ]
}