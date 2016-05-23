export default function (name) {
    return new Promise(resolve => {
        require([`text!./data/${name}.case`], (text) => {
            let cases = text.split('---\n')
                .map(c => c.trimRight()) // todo
                .filter(c => c != '')
            resolve(cases)
        })
    })
}