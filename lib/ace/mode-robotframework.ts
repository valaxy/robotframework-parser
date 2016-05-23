ace.define("ace/mode/robotframework_highlight_rules", ["require", "exports"], function (require, exports) {
    let oop                = require("../lib/oop")
    let TextHighlightRules = require("./text_highlight_rules").TextHighlightRules

    // ace不支持regexp的i标识
    let createRegexpWithI = function (keywords:string[]) {
        let reg = ''
        for (let keyword of keywords) {
            for (let i = 0; i < keyword.length; i++) {
                let ch = keyword[i]
                reg += `[${ch.toLowerCase()}${ch.toUpperCase()}]`
            }
            reg += '|'
        }
        reg = reg.slice(0, reg.length - 1)
        return reg
    }

    let RobotframeworkHighlightRules = function () {
        let caseName = {
            token: 'case_name',
            regex: /[a-zA-Z0-9_ ]+/
        }

        let keywords = createRegexpWithI([
            'open browser',
            'maximize browser window',
            'set selenium speed',
            'login page should be open'
        ])

        this.$rules = { // 不匹配换行符的
            start: [{
                token: 'whitespace',
                regex: /[ \t]+/,
                next : 'start'
            }, {
                token: 'head',
                regex: /\*.*/,
                next : 'start'
            }, Object.assign({
                next: 'cellEnd'
            }, caseName)],

            cellEnd: [{
                token: 'separator',
                regex: /(?:(?:  )|(?: \t)|\t)[ \t]*/,
                next : 'cellStart'
            }, Object.assign({
                next: 'cellEnd'
            }, caseName)],

            cellStart: [{
                token: 'argument',
                regex: /\$\{[a-zA-Z0-9 ]+}/,
                next : 'cellEnd'
            }, {
                token: 'cell', // 其他的
                regex: /(?:(?: (?! ))|[^ \t])*[^ \t]/,
                next : 'cellEnd'
            }]

            //{
            //    token: 'keyword',
            //        regex: keywords,
            //    next : 'cellEnd'
            //},
        }
    }

    oop.inherits(RobotframeworkHighlightRules, TextHighlightRules);

    exports.RobotframeworkHighlightRules = RobotframeworkHighlightRules
})

ace.define("ace/mode/robotframework", ["require", "exports", "module"], function (require, exports) {
    var oop                          = require("../lib/oop")
    var TextMode                     = require("./text").Mode
    var RobotframeworkHighlightRules = require("./robotframework_highlight_rules").RobotframeworkHighlightRules

    var Mode = function () {
        this.HighlightRules = RobotframeworkHighlightRules
    }

    oop.inherits(Mode, TextMode)

    exports.Mode = Mode
})
