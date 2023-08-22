<template>
  <div class="observe">
    <el-row :gutter="20">
      <el-col :span="12">
          <Left></Left>
      </el-col>
      <el-col :span="12">
          <Right></Right>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Right from "./Right";
import Left from "./Left";
export default {
  components: {
    Right,
    Left,
  },
};
</script>

<style>
</style>