import TokenNode from './tokenNode'

interface RuleNode {
    type: string
    children: Array<TokenNode | RuleNode>
    leftmost: TokenNode
    rightmost: TokenNode,
    parent: TokenNode | RuleNode
}

export default RuleNode