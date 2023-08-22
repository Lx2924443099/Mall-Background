<template>
  <div class="categortSelect">
    <el-form
      :inline="true"
      class="demo-form-inline"
      :model="cForm"
      :disabled="show"
    >
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="getCategoryList2"
        >
          <el-option
            v-for="item in list1"
            :label="item.name"
            :key="item.id"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category2Id"
          @change="getCategoryList3"
        >
          <el-option
            v-for="item in list2"
            :label="item.name"
            :key="item.id"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category3Id"
          @change="$emit('getCategoryId', cForm.category3Id, 3)"
        >
          <el-option
            v-for="item in list3"
            :label="item.name"
            :key="item.id"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "categortSelect",
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  props: ["show"],
  mounted() {
    this.getCategoryList1();
  },
  methods: {
    async getCategoryList1() {
      let result = await this.$API.attr.reqCategory1List();
      if (result.code == 200) {
        this.list1 = result.data;
      }
    },
    async getCategoryList2() {
      this.list2 = [];
      this.list3 = [];
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      this.$emit("getCategoryId", this.cForm.category1Id, 1);
      let result = await this.$API.attr.reqCategory2List(
        this.cForm.category1Id
      );
      if (result.code == 200) {
        this.list2 = result.data;
      }
    },
    async getCategoryList3() {
      this.list3 = [];
      this.$emit("getCategoryId", this.cForm.category2Id, 2);
      this.cForm.category3Id = "";
      let result = await this.$API.attr.reqCategory3List(
        this.cForm.category2Id
      );
      if (result.code == 200) {
        this.list3 = result.data;
      }
    },
  },
};
</script>

<style>
</style>