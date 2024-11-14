import axios from 'axios'
import dayjs from 'dayjs'
import { v1 as uuid1 } from 'uuid'


// 生成文件名字
export const filenameGenerator = (file) => {
    // 获取文件后缀
    let splits = file.name.split('.')
    let length = splits.length
    let suffix = length > 1 ? splits[length - 1] : ''
    // 生成唯一标识
    let uuid = uuid1().replace(/-/g, '')
    // 返回文件名字
    return suffix === '' ? `${uuid}` : `${uuid}.${suffix}`
}

// git文件上传请求
export const fileUploadToGitRepo = (file, callback) => {
    let filename = filenameGenerator(file)
    let currentDay = dayjs().format('YYYY-MM')
    let reader = new FileReader()
    reader.onload = (e) => {
        let url = `${process.env.VUE_APP_GITEE_IMAGE_REPO}/${process.env.VUE_APP_GIT_IMAGE_PROJ}/${currentDay}/${filename}`
        let headers = {
            "Content-Type": "application/json", 
            "Authorization": process.env.VUE_APP_GITEE_IMAGE_TOKEN
        }
        let data = {
            "message": "上传图片!", 
            "content": e.target.result.split(',')[1]
        }
        // GITEE上传使用POST方法，GITHUB上传使用PUT方法
        axios({url: url, method: 'POST', data: data, headers: headers}).then(response => {
            callback(response.data.content.download_url)
        })
    }
    reader.readAsDataURL(file)
}

// 时间格式化
export const dateTimeFormat = (time) => {
    return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}
export const dateFormat = (time) => {
    return dayjs(time).format('YYYY-MM-DD')
}