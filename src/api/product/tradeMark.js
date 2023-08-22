import request from '@/utils/request'
// 获取品牌管理数据
// 获取品牌管理接口 GET /admin/product/baseTrademark/{page}/{limit}
/**
 * 获取品牌列表
 * @param {number} page 
 * @param {number} limit 
 * @returns 
 */
export const reqTradeMarkList = (page, limit) => request(
    {
        url: `/admin/product/baseTrademark/${page}/${limit}`,
        method: 'get'
    }
)

/**
 * 修改或者新增品牌
 * @param {object} tradeMark 
 * @returns 
 */
export const addOrUpdateTradeMark = (tradeMark) => {
    // 修改品牌
    // PUT /admin/product/baseTrademark/update
    if (tradeMark.id) {
        return request({
            url: '/admin/product/baseTrademark/update',
            method: 'put',
            data: tradeMark
        })
    } else {
        // 新增品牌
        // POST /admin/product/baseTrademark/save
        return request({
            url: '/admin/product/baseTrademark/save',
            method: 'post',
            data: tradeMark
        })
    }
}

//删除品牌的接口 DELETE /admin/product/baseTrademark/remove/{id}
/**
 * 删除品牌
 * @param {number} id 
 * @returns 
 */
export const reqDeleteTradeMark = (id) => {
    return request({
        url: `/admin/product/baseTrademark/remove/${id}`,
        method: "delete"
    })
}

