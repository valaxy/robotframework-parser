import buildSyntax, {syntaxNames} from "./syntax/buildSyntax"
import peg = require('pegjs/lib/peg')

let syntax = buildSyntax()
let parser = peg.buildParser(syntax, {
    allowedStartRules: syntaxNames
})

export default function parse(text, startRule) {
    return parser.parse(text, {startRule})
}