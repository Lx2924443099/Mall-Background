<template>
  <div>
    <el-card>
      <div slot="header">
        <div class="search-header">
          <span>线上热门搜索</span>
          <el-dropdown>
            <span>
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div style="margin-top: 20px">
        <el-row :gutter="20">
          <el-col :span="12"><Charts></Charts></el-col>
          <el-col :span="12"><Charts></Charts></el-col>
        </el-row>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column type="index" label="排名" sortable width="80">
          </el-table-column>
          <el-table-column label="搜索关键词" width="width"> </el-table-column>
          <el-table-column label="用户数" sortable width="width">
          </el-table-column>
          <el-table-column label="周涨幅" sortable width="width">
          </el-table-column>
        </el-table>
        <el-pagination layout=" prev,pager,next" :total="1000" align="right"></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import Charts from "./Charts";
export default {
  components: {
    Charts,
  },
  data() {
    return {
      tableData: [{}],
    };
  },
};
</script>

<style>
.search-header {
  display: flex;
  justify-content: space-between;
}
</style>