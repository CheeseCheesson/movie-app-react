export const cuttingText = (text, limit= 25) => {
    let result = ''
    result = text.split(' ').slice(0, limit).join(' ')
    return result
}
