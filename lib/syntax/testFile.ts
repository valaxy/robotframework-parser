import {chunk,any,rangeOf,anyOf,subRule,zeroOrMore,oneOrMore,optional,sequence,label,gather} from 'pegjs-builder/lib/peg/patterns'

export = {
    isToken: false,

    name: 'testFile',

    body: [
        sequence(
            zeroOrMore(gather(sequence(
                subRule('whitespace'),
                subRule('testCase')
            ))),
            subRule('whitespace')
        )
    ]
}