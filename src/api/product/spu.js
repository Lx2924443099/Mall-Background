import request from '@/utils/request'

// GET /admin/product/{page}/{limit}
/**
 * 获取spu列表
 * @param {number} page 页号
 * @param {number} limit 数据条数
 * @param {number} category3Id 三级类目id
 * @returns 
 */
export const reqSpuList = (page, limit, category3Id) => {
    return request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })
}

// GET /admin/product/baseTrademark/getTrademarkList
/**
 * 获取品牌数据
 * @returns 
 */
export const reqTradeMarkList = () => { return request({ url: "/admin/product/baseTrademark/getTrademarkList", method: "get" }) }

// GET /admin/product/baseSaleAttrList
/**
 * 获取平台的销售属性
 * @returns 
 */
export const reqSaleAttrList = () => { return request({ url: "/admin/product/baseSaleAttrList", method: "get" }) }

// GET /admin/product/getSpuById/{spuId}
/**
 * 获取某个spu信息
 * @param {number} spuId 
 * @returns 
 */
export const reqSpu = (spuId) => { return request({ url: `/admin/product/getSpuById/${spuId}`, method: "get" }) }

// GET /admin/product/spuImageList/{spuId}
/**
 * 获取spu图片
 * @param {number} spuId 
 * @returns 
 */
export const reqSpuImageList = (spuId) => { return request({ url: `/admin/product/spuImageList/${spuId}`, method: "get" }) }

// POST /admin/product/updateSpuInfo
/**
 * 添加或修改spu
 * @param {object} spu 
 * @returns 
 */
export const reqAddOrUpdateSpu = (spu) => {
    if (spu.id) {
        return request({ url: "/admin/product/updateSpuInfo", method: "post", data: spu })
    } else {
        // POST /admin/product/saveSpuInfo
        return request({ url: "/admin/product/saveSpuInfo", method: "post", data: spu })
    }
}

// DELETE /admin/product/deleteSpu/{spuId}
/**
 * 删除spu
 * @param {number} spuId 
 * @returns 
 */
export const reqDeleteSpu = (spuId) => {
    return request({ url: `/admin/product/deleteSpu/${spuId}`, method: "delete" })
}

// GET /admin/product/spuSaleAttrList/{spuId}
/**
 * 获取spu销售属性列表
 * @param {number} spuId 
 * @returns 
 */
export const reqSpuSaleAttrList = (spuId) => {
    return request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })
}

// GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
/**
 * 获取平台属性列表
 * @param {number} category1Id 
 * @param {number} category2Id 
 * @param {number} category3Id 
 * @returns 
 */
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => {
    return request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })
}

// POST /admin/product/saveSkuInfo
/**
 * 新增sku
 * @param {number} skuInfo 
 * @returns 
 */
export const addSku = (skuInfo) => {
    return request({ url: '/admin/product/saveSkuInfo', data: skuInfo, method: "post" })
}

// GET /admin/product/findBySpuId/{spuId}
/**
 * 获取sku列表
 * @param {number} spuId 
 * @returns 
 */
export const reqSkuList = (spuId) => {
    return request({ url: `/admin/product/findBySpuId/${spuId}`, method: "get" })
}