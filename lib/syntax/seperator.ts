import {chunk,any,rangeOf,anyOf,subRule,zeroOrMore,oneOrMore,optional,sequence,label} from 'pegjs-builder/lib/peg/patterns'

// ' ' ' ' [ \t]*
// '\t' [ \t]*

export = {
    isToken: true,

    isIgnore: false,

    name: 'seperator',

    body: [
        sequence(
            chunk(' '),
            chunk(' '),
            zeroOrMore(anyOf(
                chunk(' \t')
            ))
        ),
        sequence(
            chunk('\t'),
            zeroOrMore(anyOf(
                chunk(' \t')
            ))
        )
    ]
}