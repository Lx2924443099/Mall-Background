<template>
  <div class="charts" ref="lineChart"></div>
</template>
  
  <script>
import * as echarts from "echarts";
export default {
  mounted() {
    let lineChart = echarts.init(this.$refs.lineChart);
    lineChart.setOption({
      xAxis: { show: false, min: 0, max: 100 },
      yAxis: { show: false, type: "category" },
      series: [
        {
          type: "bar",
          data: [78],
          barWidth: 10,
          color: "yellowgreen",
          showBackground: true,
          backgroundStyle: {
            color: "#eee",
          },
          label: {
            show: true,
            formatter: "|",
            position: "right",
          },
        },
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
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