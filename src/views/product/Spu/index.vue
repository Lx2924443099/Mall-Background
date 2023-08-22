<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene != 0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table :data="records" border stripe>
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row }">
              <el-button
                type="success"
                size="mini"
                icon="el-icon-plus"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-edit"
                @click="update(row)"
              ></el-button>
              <el-button
                type="info"
                size="mini"
                icon="el-icon-info"
                @click="setSku(row)"
              ></el-button>
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="deleteSpu(row)"
                style="margin-left: 10px"
              >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @size-change="sizeChange"
          @current-change="getSpuList"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout=" prev, pager, next, jumper,->, sizes, total"
          :total="total"
          background
          align="center"
        >
        </el-pagination>
      </div>

      <div v-show="scene == 1">
        <SpuForm :cancel="cancel" ref="spu"></SpuForm>
      </div>

      <div v-show="scene == 2">
        <SkuForm :cancel="cancel" ref="sku"></SkuForm>
      </div>
    </el-card>
    <el-dialog
      :title="`${spu.spuName}的SKU列表`"
      :visible.sync="dialogTableVisible"
      @closed="close"
    >
      <el-table :data="skuList" border v-loading="loading">
        <el-table-column
          property="skuName"
          label="sku名称"
          width="width"
        ></el-table-column>
        <el-table-column
          property="price"
          label="价格"
          width="width"
        ></el-table-column>
        <el-table-column property="weight" label="重量"></el-table-column>
        <el-table-column label="默认图片" width="width">
          <template slot-scope="{ row }">
            <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import CategorySelect from "@/components/CategorySelect";
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  components: {
    CategorySelect,
    SpuForm,
    SkuForm,
  },
  data() {
    return {
      dialogTableVisible: false,
      category1Id: "",
      category2Id: "",
      category3Id: "",
      page: 1,
      limit: 3,
      records: [],
      total: 0,
      scene: 0,
      spu: "",
      skuList: [],
      loading: true,
    };
  },
  methods: {
    getCategoryId(categoryId, level) {
      if (level === 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level === 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    sizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    async getSpuList(pager = 1) {
      this.page = pager;
      let result = await this.$API.spu.reqSpuList(
        this.page,
        this.limit,
        this.category3Id
      );
      if ((result.code = 200)) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    update(row) {
      this.scene = 1;
      this.$refs.spu.initSpuData(row);
    },
    cancel({ flag }) {
      this.scene = 0;
      if (flag != "修改") {
        this.page = 1;
      }
      this.getSpuList(this.page);
    },
    addSpu() {
      this.scene = 1;
      this.$refs.spu.addSpuData(this.category3Id);
    },
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    addSku(row) {
      this.scene = 2;
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    async setSku(spu) {
      this.spu = spu;
      this.dialogTableVisible = true;
      let result = await this.$API.spu.reqSkuList(spu.id);
      if (result.code == 200) {
        this.skuList = result.data;
        this.loading = false;
      }
    },
    close(done) {
      this.loading = true;
      this.spu = [];
      done();
    },
  },
};
</script>

<style>
</style>