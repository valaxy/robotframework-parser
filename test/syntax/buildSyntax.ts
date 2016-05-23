import buildSyntax from "../../lib/syntax/buildSyntax"

QUnit.module('buildSyntax')


QUnit.test('default', assert => {
    let text = buildSyntax()
    console.log(text)

    assert.ok(true)
})