interface Location {
    line: number,
    col: number,
    offset: number
}

interface TokenNode {
    type: string
    text: string
    location: {
        start: Location  // start的位置是第一个字符的位置
        end: Location    // end的位置是最后一个字符的位置+1
    },
    parent // type of Node
}

export default TokenNode