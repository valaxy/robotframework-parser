import rule from 'pegjs-builder/lib/peg/rule'
import Syntax from 'pegjs-builder/lib/peg/syntax'
import parsingExpression from 'pegjs-builder/lib/peg/parsingExpression'
import Pattern from "pegjs-builder/lib/peg/pattern/pattern"
import {sequence, subRule, optional, label, gather} from 'pegjs-builder/lib/peg/patterns'
import stringHelp from 'pegjs-builder/lib/utility/stringHelp'


let expandPatternForToken = function (pattern:Pattern) {
    return sequence(
        pattern,
        optional(subRule('whitespace'))
    )
}


let expandPatternForRule = function (pattern:Pattern) {
    return label(
        'root',
        gather(pattern)
    )
}

let initFunction = function () {
    let getNodes = function (root) {
        let nodes = root
            .filter(node => !!node) // todo, 为什么这里会返回null和undefined
            .map(rule => {
                if (typeof rule == 'string') {
                    return {
                        type    : rule,
                        text    : rule,
                        location: null,
                        parent  : null
                    }
                } else if (Array.isArray(rule)) {
                    return getNodes(rule)
                } else { // Object
                    return rule
                }
            })

        nodes = nodes.reduce((total, something) => {
            return total.concat(something)
        }, [])

        return nodes
    }

    let initChildren = function (root, parent) {
        let nodes = getNodes(root)
        nodes.map(node => node.parent = parent)
        return nodes
    }
}


let buildTokenAction = function (tokenName) {
    return `
        return {
            type:     ${JSON.stringify(tokenName)},
            text:     text(),
            location: location(),
            parent:   null
        }
    `
}


let buildRuleAction = function (ruleName) {
    return `
        let currentNode = {
            type: ${JSON.stringify(ruleName)}
        }
        currentNode.children = initChildren(root, currentNode)
        console.log(currentNode)
        return currentNode
    `
}


let buildIgnoreTokenAction = function () {
    return `
        return ''
    `
}


let syntaxBlocks = [
    require('./testFile'),
    require('./testCase'),
    require('./testCaseName'),
    require('./testCaseBody'),
    require('./testCaseCommand'),
    require('./seperator'),
    require('./keyword'),
    require('./argument'),
    require('./whitespace'),
    require('./endLine')
]

export default function buildSyntax() {
    let rules = syntaxBlocks.map(block => {
        let isToken  = block.isToken
        let isIgnore = block.isIgnore
        let name     = block.name
        let body     = block.body

        if (isToken) {
            if (isIgnore) {
                return rule(name, body.map(pattern => {
                    return parsingExpression(pattern,
                        buildIgnoreTokenAction()
                    )
                }))
            } else {
                return rule(name, body.map(pattern => {
                    return parsingExpression(
                        pattern,
                        //expandPatternForToken(pattern),
                        buildTokenAction(name)
                    )
                }))
            }
        } else {
            return rule(name, body.map(pattern => {
                return parsingExpression(
                    expandPatternForRule(pattern),
                    buildRuleAction(name)
                )
            }))
        }
    })

    let syntax = new Syntax(rules)
    return '{\n' + stringHelp.getExecScript(initFunction) + '\n}\n' + syntax.toPegText()
}

export var syntaxNames = syntaxBlocks.map(block => block.name)


//testFile
//    = testCase*
//comment
//    = '#' .*? endLine?
