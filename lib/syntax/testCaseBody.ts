import {chunk,any,rangeOf,anyOf,subRule,zeroOrMore,oneOrMore,optional,sequence,label,gather} from 'pegjs-builder/lib/peg/patterns'

// testCaseCommand

export = {
    isToken: false,

    name: 'testCaseBody',

    body: [
        sequence(
            subRule('testCaseCommand'),
            zeroOrMore(gather(sequence(
                subRule('endLine'),
                subRule('testCaseCommand')
            ))),
            optional(
                subRule('endLine')
            )
        )
    ]
}