// cloudfunctions/createPost/index.js
const cloud = require('cloud1-8g1hzp6aa3efb8f4')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { content, images, tags, type } = event
  const { OPENID } = cloud.getWXContext()

  // 1. 内容安全检查
  try {
    const result = await cloud.openapi.security.msgSecCheck({ content })
    if (result.errCode !== 0) return { code: 500, msg: '内容包含违规信息' }
  } catch (err) {
    return { code: 500, msg: '内容包含违规信息', error: err }
  }

  // 2. 写入数据库
  try {
    const res = await db.collection('posts').add({
      data: {
        _openid: OPENID,
        content,
        images: images || [],
        tags: tags || [],
        type: type || 'daily',
        createTime: db.serverDate(),
        viewCount: 0,
        likeCount: 0,
        status: 1
      }
    })
    return { code: 200, msg: '发布成功', id: res._id }
  } catch (e) {
    return { code: 500, msg: '发布失败', error: e }
  }
}