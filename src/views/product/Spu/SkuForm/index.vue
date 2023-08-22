<template>
  <div>
    <el-form ref="form" label-width="80px" :inline="false" size="normal">
      <el-form-item label="SPU名称"> {{ spu.spuName }} </el-form-item>
      <el-form-item label="SKU名称">
        <el-input
          placeholder="请输入SKU名称"
          v-model="skuForm.skuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          placeholder="请输入价格"
          type="number"
          v-model="skuForm.price"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="请输入重量" v-model="skuForm.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          type="textarea"
          placeholder="规格描述"
          v-model="skuForm.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form ref="form" label-width="80px">
          <el-form-item
            v-for="item in attrInfoList"
            :key="item.id"
            :label="item.attrName"
          >
            <el-select placeholder="请选择" v-model="item.attrIdAndValueId">
              <el-option
                v-for="option in item.attrValueList"
                :key="option.id"
                :label="option.valueName"
                :value="`${item.id}:${option.id}`"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form ref="form" label-width="80px" :inline="false" size="normal">
          <el-form-item
            v-for="item in spuSaleAttrList"
            :key="item.id"
            :label="item.saleAttrName"
          >
            <el-select placeholder="请选择" v-model="item.attrIdAndValueId">
              <el-option
                v-for="saleAttrValue in item.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                :label="saleAttrValue.saleAttrValueName"
                :value="`${item.id}:${saleAttrValue.id}`"
              >
              </el-option
            ></el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          border
          stripe
          :data="spuImageList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="80"> </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{ row }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                icon="el-icon-plus"
                v-if="!row.isDefault"
                @click="changeDefault(row)"
                >设置默认</el-button
              >
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancelAdd">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      spuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      skuForm: {
        category3Id: 0,
        id: 0,
        isSale: 0,
        price: 0,
        spuId: 0,
        tmId: 0,
        weight: "",
        skuName: "",
        skuDefaultImg: "",
        skuDesc: "",
        skuAttrValueList: [],
        skuImageList: [],
        skuSaleAttrValueList: [],
      },
      spu: {},
      imgList: [],
    };
  },
  methods: {
    async getData(category1Id, category2Id, spu) {
      this.skuForm.category3Id = spu.category3Id;
      this.skuForm.spuId = spu.id;
      this.skuForm.tmId = spu.tmId;
      this.spu = spu;
      let imgListResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (imgListResult.code == 200) {
        let list = imgListResult.data;
        list.forEach((element) => {
          element.isDefault = 0;
        });
        this.spuImageList = list;
      }

      let spuSaleAttrListResult = await this.$API.spu.reqSpuSaleAttrList(
        spu.id
      );
      if (spuSaleAttrListResult.code == 200) {
        this.spuSaleAttrList = spuSaleAttrListResult.data;
      }

      let attrInfoListResult = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (attrInfoListResult.code == 200) {
        this.attrInfoList = attrInfoListResult.data;
      }
    },
    handleSelectionChange(params) {
      this.imgList = params;
    },
    changeDefault(row) {
      this.spuImageList.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      this.skuForm.skuDefaultImg = row.imgUrl;
    },
    cancelAdd() {
      Object.assign(this._data, this.$options.data());
      this.cancel({ flag: "" });
    },
    async save() {
      this.attrInfoList.forEach((item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(":");
          this.skuForm.skuAttrValueList.push({ attrId, valueId });
        }
      });
      this.spuSaleAttrList.forEach((item) => {
        if (item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] =
            item.attrIdAndValueId.split(":");
          this.skuForm.skuSaleAttrValueList.push({
            saleAttrId,
            saleAttrValueId,
          });
        }
      });
      this.skuForm.skuImageList = this.imgList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImdId: item.id,
        };
      });

      let result = await this.$API.spu.addSku(this.skuForm);
      if (result.code==200) {
        this.$message({type:"success",message:"保存成功!"})
        this.cancelAdd()
      }
    },
  },
  props: ["cancel"],
};
</script>

<style>
</style>