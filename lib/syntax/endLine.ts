import {chunk,any,rangeOf,anyOf,subRule,zeroOrMore,oneOrMore,optional,sequence,label} from 'pegjs-builder/lib/peg/patterns'

export = {
    isToken: true,

    isIgnore: false,

    name: 'endLine',

    body: [
        chunk('\n')
    ]
}