import request from '@/utils/request'

// GET /admin/product/list/{page}/{limit}
/**
 * 获取sku列表
 * @param {number} page 页号
 * @param {number} limit 数据条数
 * @returns
 */
export const reqSkuList = (page, limit) => {
    return request({ url: `/admin/product/list/${page}/${limit}`, method: "get" })
}

// GET /admin/product/cancelSale/{skuId}
/**
 * 下架sku
 * @param {number} skuId 
 * @returns 
 */
export const cancelSale = (skuId) => {
    return request({ url: `/admin/product/cancelSale/${skuId}`, method: "get" })
}

// GET /admin/product/onSale/{skuId}
/**
 * 上架sku
 * @param {number} skuId 
 * @returns 
 */
export const onSale = (skuId) => {
    return request({ url: `/admin/product/onSale/${skuId}`, method: "get" })
}

// GET /admin/product/getSkuById/{skuId}
/**
 * 获取sku信息
 * @param {number} skuId 
 * @returns 
 */
export const getSkuById = (skuId) => {
    return request({ url: `/admin/product/getSkuById/${skuId}`, method: "get" })
}

// DELETE /admin/product/deleteSku/{skuId}
/**
 * 删除sku
 * @param {number} skuId 
 * @returns 
 */
export const deleteSku = (skuId) => {
    return request({ url: `/admin/product/deleteSku/${skuId}`, method: "delete" })
}