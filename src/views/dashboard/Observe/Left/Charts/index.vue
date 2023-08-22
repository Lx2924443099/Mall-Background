<template>
  <div>
    <div class="header">
      <span style="margin-right: 20px">搜索用户数</span>
      <svg
        t="1689679561862"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2289"
        width="16"
        height="16"
      >
        <path
          d="M512 1024c-136.8 0-265.3-53.3-362-150C53.3 777.3 0 648.8 0 512s53.3-265.3 150-362C246.7 53.3 375.2 0 512 0s265.3 53.3 362 150c96.7 96.7 150 225.3 150 362 0 136.8-53.3 265.3-150 362-96.7 96.7-225.2 150-362 150z m0-979.5c-124.9 0-242.3 48.6-330.6 136.9C93.1 269.7 44.5 387.1 44.5 512s48.6 242.3 136.9 330.6c88.3 88.3 205.7 136.9 330.6 136.9 124.9 0 242.3-48.6 330.6-136.9 88.3-88.3 136.9-205.7 136.9-330.6 0-124.9-48.6-242.3-136.9-330.6C754.3 93.1 636.9 44.5 512 44.5z"
          fill=""
          p-id="2290"
        ></path>
        <path
          d="M480.8 244.3c0 17.2 14 31.2 31.2 31.2s31.2-14 31.2-31.2-14-31.2-31.2-31.2-31.2 14-31.2 31.2zM512 810.9c-12.2 0-22.3-10-22.3-22.3V387.9c0-12.2 10-22.3 22.3-22.3 12.2 0 22.3 10 22.3 22.3v400.7c0 12.3-10.1 22.3-22.3 22.3z"
          fill=""
          p-id="2291"
        ></path>
      </svg>
    </div>
    <div class="main">
      <span style="margin-right: 20px">12371</span>
      <span style="margin-right;: 15px"
        >17.1
        <svg
          t="1689680731065"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4492"
          width="16"
          height="16"
        >
          <path
            d="M960 704L512 256l-448 448z"
            fill="#d81e06"
            p-id="4493"
          ></path>
        </svg>
        <svg
          t="1689680855808"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5552"
          width="16"
          height="16"
        >
          <path d="M64 320l448 448 448-448z" fill="#1afa29" p-id="5553"></path>
        </svg>
      </span>
    </div>
    <div class="charts" ref="lineChart"></div>
  </div>
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
          type: "line",
          data: [22, 17, 33, 15, 38, 9, 16, 25, 19],
          itemStyle: {
            opacity: 0,
          },
          lineStyle: {
            color: "purple",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "white", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          smooth: true,
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
  height: 60px;
}
.header {
  display: flex;
  align-items: center;
  color: #d9d9d9;
  font-size: 16px;
}
</style>