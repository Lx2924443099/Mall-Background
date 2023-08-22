<template>
  <div>
    <el-table border stripe :data="skuList">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column label="默认图片" width="150" align="center">
        <template slot-scope="{ row }">
          <img :src="row.skuDefaultImg" style="width: 80px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" width="80">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" width="80">
      </el-table-column>
      <el-table-column label="操作" width="width" align="center">
        <template slot-scope="{ row }">
          <el-button
            v-if="row.isSale"
            type="success"
            icon="el-icon-sort-down"
            size="mini"
            @click="cancelSale(row)"
          ></el-button>
          <el-button
            v-else
            icon="el-icon-sort-up"
            size="mini"
            @click="onSale(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteSku(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      :page-sizes="[10, 20, 50]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->, sizes, total"
      :total="total"
      background
      align="center"
      :pager-count="7"
      @current-change="getSkuList"
      @size-change="sizeChange"
    >
    </el-pagination>
    <el-drawer
      :visible.sync="drawer"
      direction="rtl"
      :show-close="false"
      size="45%"
    >
      <el-row>
        <el-col :span="5"> 名称 </el-col>
        <el-col :span="16"> {{ skuInfo.skuName }} </el-col>
      </el-row>
      <el-row>
        <el-col :span="5"> 描述 </el-col>
        <el-col :span="16"> {{ skuInfo.skuDesc }} </el-col>
      </el-row>
      <el-row>
        <el-col :span="5"> 价格 </el-col>
        <el-col :span="16"> {{ skuInfo.price }}元 </el-col>
      </el-row>
      <el-row>
        <el-col :span="5"> 平台属性 </el-col>
        <el-col :span="16">
          <template>
            <el-tag
              type="success"
              size="mini"
              v-for="value in skuInfo.skuAttrValueList"
              :key="value"
            >
              {{ value.attrid }}-{{ value.valueId }}
            </el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5"> 商品图片 </el-col>
        <el-col :span="16">
          <el-carousel height="400px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item">
              <img :src="item.imgUrl" style="width: 100%; height: 100%" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      skuList: [],
      page: 1,
      limit: 10,
      total: 0,
      drawer: false,
      skuInfo: {},
    };
  },
  methods: {
    async getSkuList(pager = 1) {
      this.page = pager;
      let result = await this.$API.sku.reqSkuList(this.page, this.limit);
      if (result.code == 200) {
        this.skuList = result.data.records;
        this.total = result.data.total;
      }
    },
    sizeChange(limit = 10) {
      this.limit = limit;
      this.getSkuList();
    },
    async cancelSale(row) {
      let result = await this.$API.sku.cancelSale(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "下架成功！" });
        this.getSkuList();
      }
    },
    async onSale(row) {
      let result = await this.$API.sku.onSale(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "上架成功！" });
        this.getSkuList();
      }
    },
    edit() {
      this.$message("正在开发中...");
    },
    async getSkuInfo(row) {
      this.drawer = true;
      let result = await this.$API.sku.getSkuById(row.id);
      if (result.code == 200) {
        this.skuInfo = result.data;
      }
    },
    async deleteSku(row) {
      let result = await this.$API.sku.deleteSku(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功!" });
        this.getSkuList(this.page);
      }
    },
  },
  mounted() {
    this.getSkuList();
  },
};
</script>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<style>
.el-carousel__button {
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
}
</style>