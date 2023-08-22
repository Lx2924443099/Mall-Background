import request from '@/utils/request'

/**
 *获取一级菜单 GET /admin/product/getCategory1 
 *@returns
 */
export const reqCategory1List = () => {
    return request({ url: '/admin/product/getCategory1', method: 'get' })
}
/**获取二级菜单
 * @param {number} category1Id 一级分类id
 * 
 * @returns
*/
export const reqCategory2List = (category1Id) => {
    return request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get' })
}
/**获取三级菜单
 * 
 * @param {number} category2Id 二级分类id
 * 
 * @returns
*/
export const reqCategory3List = (category2Id) => {
    return request({ url: `/admin/product/getCategory3/${category2Id}`, method: 'get' })
}
/**获取品牌属性列表 GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
 * 
 * @param {number} category1Id 一级分类id
 * @param {number} category2Id 二级分类id
 * @param {number} category3Id 三级分类id
 * 
 * @returns
*/
export const reqAttrList = (category1Id, category2Id, category3Id) => {
    return request({
        url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method: 'get'
    })
}

/**添加品牌属性接口 POST /admin/product/saveAttrInfo
 * @param {object} data 品牌属性信息
 * 
 * @returns
*/
export const reqAddOrUpdateAttr = data => {
    return request(
        {
            url: "/admin/product/saveAttrInfo",
            method: 'post',
            data
        }
    )
}