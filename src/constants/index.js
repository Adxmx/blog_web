export const BLOG_FLAG = {
    1: '原创',
    2: '转载',
    3: '翻译'
}

export const BLOG_FLAG_COLOR = {
    1: 'blue',
    2: 'orange',
    3: 'green'
}

export const BLOG_STATUS = {
    0: '草稿',
    1: '发布'
}


export const formatFilter = (data) => {
    let res = []
    for (let k in data) {
        res.push({ text: data[k], value: k  })
    }
    return res
}
