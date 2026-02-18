const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { content, images, tags, type } = event
  const { OPENID } = cloud.getWXContext()

  // 1. 内容安全检查 (策略优化：只有当有文字时才检查)
  if (content && content.trim().length > 0) {
    try {
      const result = await cloud.openapi.security.msgSecCheck({
        content: content
      })
      if (result.errCode !== 0) {
        return { code: 500, msg: '内容含有违规信息，请修改' }
      }
    } catch (err) {
      // 错误码 87014 代表内容违规
      if (err.errCode === 87014) {
        return { code: 500, msg: '内容含有敏感信息，请修改' }
      }
      // 其他配置错误（如未开通接口），为了不阻断开发，建议先打印日志放行
      console.error('内容安全检测接口异常（可能是未开通该服务）:', err)
    }
  }

  // 2. 写入数据库
  try {
    const res = await db.collection('posts').add({
      data: {
        _openid: OPENID,
        content: content || '', // 确保不存 undefined
        images: images || [],
        tags: tags || [],
        type: type || 'daily',
        createTime: db.serverDate(),
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        status: 1
      }
    })
    return { code: 200, msg: '发布成功', id: res._id }
  } catch (e) {
    console.error('数据库写入失败:', e)
    // 如果是集合不存在，提示特定信息
    if (e.errMsg && e.errMsg.includes('Collection not found')) {
      return { code: 500, msg: '数据库集合 posts 不存在' }
    }
    return { code: 500, msg: '发布失败，请稍后重试', error: e }
  }
}