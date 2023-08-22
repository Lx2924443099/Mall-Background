<template>
  <div class="charts" ref="lineChart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  mounted() {
    let lineChart = echarts.init(this.$refs.lineChart);
    lineChart.setOption({
      xAxis: { show: false, type: "category" },
      yAxis: { show: false },
      series: [
        {
          type: "bar",
          data: [22, 17, 33, 15, 38, 9, 16, 25, 19],
        },
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      tooltip:{},
    });
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>