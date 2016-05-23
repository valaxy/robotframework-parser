import parse from "../../lib/index"
import readCase from './readCase'
import {syntaxNames} from '../../lib/syntax/buildSyntax'
import TokenNode from "../../lib/grammarTree/tokenNode"
import RuleNode from "../../lib/grammarTree/ruleNode";

QUnit.module('parse')

let test = function (ruleName) {
    QUnit.test(ruleName, assert => {
        let done = assert.async()

        readCase(ruleName).then((cases:string[]) => {
            if (cases.length == 0) {
                assert.ok(true, '没有case数据')
                return done()
            }

            cases.forEach(caseText => {
                let result = parse(caseText, ruleName)
                assert.ok(result.constructor === Object, caseText)
            })
            done()
        })
    })
}

QUnit.test('alone argument', assert => {
    let node:TokenNode = parse('a1_', 'argument')
    assert.ok(node.text, 'a1_')
})

QUnit.test('alone keyword', assert => {
    let node:TokenNode = parse('open browser', 'keyword')
    assert.equal(node.text, 'open browser')
})

QUnit.test('alone testCaseCommand', assert => {
    let node:RuleNode = parse('   open  browser', 'testCaseCommand')
    assert.equal(node.children[1].text, 'open')
})

syntaxNames.reverse().forEach(syntaxName => {
    test(syntaxName)
})



