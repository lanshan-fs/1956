// cloudfunctions/createPost/index.js
const cloud = require('cloud1-8g1hzp6aa3efb8f4')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { content, images, tags, type } = event
  const { OPENID } = cloud.getWXContext()

  // 1. 简单的内容校验 (防止空内容)
  if (!content && (!images || images.length === 0)) {
    return { code: 400, msg: '内容不能为空' }
  }

  // 2. (可选) 这里应该调用 security.msgSecCheck，暂时跳过以确保开发流畅
  // const secRes = await cloud.openapi.security.msgSecCheck({ content })

  // 3. 写入数据库
  try {
    const res = await db.collection('posts').add({
      data: {
        _openid: OPENID,
        content: content || '',
        images: images || [], // 存入 fileID 数组
        tags: tags || [],
        type: type || 'daily',
        createTime: db.serverDate(),
        // 初始交互数据
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        status: 1 // 1正常, 0删除
      }
    })
    return { code: 200, msg: '发布成功', id: res._id }
  } catch (e) {
    console.error(e)
    return { code: 500, msg: '数据库写入失败', error: e }
  }
}