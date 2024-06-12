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
    let currentDay = dayjs().format('YYYY-MM-DD')
    let reader = new FileReader()
    reader.onload = (e) => {
        console.log(e.target)

        let url = `${process.env.VUE_APP_GITHUB_IMAGE_REPO}/${process.env.VUE_APP_GITHUB_IMAGE_PROJ}/${currentDay}/${filename}`
        let headers = {
            "Content-Type": "application/json", 
            "Authorization": process.env.VUE_APP_GITHUB_IMAGE_TOKEN
        }
        let data = {
            "message": "上传图片!", 
            "content": e.target.result.split(',')[1]
        }
        axios({url: url, method: 'PUT', data: data, headers: headers}).then(response => {
            callback(response.data.content.download_url)
        })
    }
    reader.readAsDataURL(file)
}