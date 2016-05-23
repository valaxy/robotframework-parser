import {chunk,any,rangeOf,anyOf,subRule,zeroOrMore,oneOrMore,optional,sequence,label, gather} from 'pegjs-builder/lib/peg/patterns'

export = {
    isToken: true,

    isIgnore: false,

    name: 'keyword',

    body: [
        sequence(
            oneOrMore(anyOf(
                rangeOf('a', 'z'),
                rangeOf('A', 'Z'),
                rangeOf('0', '9'),
                chunk('_')
            )),
            zeroOrMore(gather(sequence(
                chunk(' '),
                oneOrMore(anyOf(
                    rangeOf('a', 'z'),
                    rangeOf('A', 'Z'),
                    rangeOf('0', '9'),
                    chunk('_')
                )))
            ))
        )
    ]
}