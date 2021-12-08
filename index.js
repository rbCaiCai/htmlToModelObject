module.exports = html => {
    if(!html) return []

    let regex = new RegExp(`<[^\\s>]+((\\s+[^\\s<>=]+(=("(.*?(\\\\")?.*?)*?"|'(.*?(\\\\')?.*?)*?'))?)+)?\\s*>`, 'g')
    let matchDatas = html.match(regex)
    if(!matchDatas || !matchDatas.length) return []

    let signalSplit = []
    for (let i = 0; i < matchDatas.length; i++) {
        let str = matchDatas[i]
        let firstIndex = html.indexOf(str)

        let beforeStr = html.substring(0, firstIndex)
        if(beforeStr) signalSplit.push({
            type: 'TEXT',
            data: beforeStr
        })

        // TAG 转换
        if(str.indexOf('</') == 0) {
            let matchTag = str.match(new RegExp('^</[^>\\s]*'))
            matchTag = matchTag[0]
            matchTag = matchTag.substring(2)
            if(!matchTag) continue

            signalSplit.push({
                type: 'END_TAG',
                tag: matchTag.toLowerCase(),
                data: null
            })
        } else {
            let matchTag = str.match(new RegExp('^<[^>\\s]*'))
            matchTag = matchTag[0]
            matchTag = matchTag.substring(1)
            if(!matchTag) continue

            let attrData = {};
            let attrRegex = new RegExp(`\\s+[^\\s<>=]+(=("(.*?(\\\\")?.*?)*?"|'(.*?(\\\\')?.*?)*?'))?`, 'g')
            let attrArr = str.match(attrRegex)
            if(attrArr && attrArr.length) {
                attrArr.forEach(text => {
                    let charIndex = text.indexOf('=')
                    let key = null
                    let value = null
                    if(charIndex < 0) {
                        key = text.substring(1)
                    } else {
                        key = text.substring(1, charIndex)
                        value = text.substring(charIndex + 2, text.length - 1)
                    }

                    attrData[key] = value
                })
            }

            signalSplit.push({
                type: 'START_TAG',
                tag: matchTag.toLowerCase(),
                data: attrData
            })
        }

        html = html.substring(beforeStr.length + str.length)
    }
    if(html) signalSplit.push({
        type: 'TEXT',
        data: html
    });

    let tagHierarchy = []
    signalSplit.forEach(item => {
        if(item.type == 'TEXT' || item.type == 'START_TAG') {
            tagHierarchy.push(item)
            return
        }
        // tyep == END_TAG
        let startTagIndex = -1
        for (let index = tagHierarchy.length - 1; index > -1; index--) {
            const tagItem = tagHierarchy[index]
            // 如果 tag 等于当前tag，并且处于未关闭状态下
            if(item.tag == tagItem.tag && !tagItem.endStatus) {
                startTagIndex = index
                break
            }
        }
        if(startTagIndex == -1) return

        let startTag = tagHierarchy[startTagIndex]
        // 标记标签已关闭
        startTag.endStatus = true
        if(!startTag.childs) {
            startTag.childs = []
        }
        let sliceIndex = startTagIndex + 1
        startTag.childs = startTag.childs.concat(tagHierarchy.slice(sliceIndex))
        tagHierarchy = tagHierarchy.slice(0, sliceIndex)
    })
    
    return tagHierarchy
}