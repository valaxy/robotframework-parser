ace.define("ace/mode/robotframework_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (require, exports) {
    let oop                = require("../lib/oop")
    let TextHighlightRules = require("./text_highlight_rules").TextHighlightRules

    let RobotframeworkHighlightRules = function () {
        let separator = {
            token: 'separator',
            regex: /(?:(?:  )|(?: \t)|\t)[ \t]*/
        }

        this.$rules = { // 不匹配换行符的
            start: [{
                token: 'whitespace',
                regex: /[ \t]+/,
                next : 'start'
            }, {
                token: 'head',
                regex: /\*.*/,
                next : 'row'
            }],

            row: [{
                token: 'head',
                regex: /\*.*/,
                next : 'row'
            }, Object.assign(separator, {
                next: 'cellStart'
            })],

            cellStart: [{
                token: 'cell',
                regex: /(?:(?: (?! ))|[^ \t])*[^ \t]/,
                next : 'cellEnd'
            }],

            cellEnd: [Object.assign(separator, {
                next: 'cellStart'
            })]
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
