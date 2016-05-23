import {chunk,any,rangeOf,anyOf,subRule,zeroOrMore,oneOrMore,optional,sequence,label,gather} from 'pegjs-builder/lib/peg/patterns'

// seperator keyword (seperator argument)*

export = {
    isToken: false,

    name: 'testCaseCommand',

    body: [
        sequence(
            subRule('seperator'),
            subRule('keyword'),
            zeroOrMore(
                gather(sequence(
                    subRule('seperator'),
                    subRule('argument')
                ))
            )
        )
    ]
}