<template>
  <div>
    <el-card shadow="always" style="margin: 10px 0">
      <div slot="header" class="clearfix">
        <el-tabs class="tab" v-model="activeName">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visite"></el-tab-pane>
        </el-tabs>
        <div class="right">
          <span @click="getToday">今日</span>
          <span @click="getWeek">本周</span>
          <span @click="getMonth">本月</span>
          <span @click="getYear">本年</span>
          <el-date-picker
            v-model="date"
            class="date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <div class="carts" ref="charts"></div>
          </el-col>
          <el-col :span="6" class="right">
            <div>
              <h3>门店{{ title }}排名</h3>
              <ul>
                <li>
                  <span class="rindex">1</span>
                  <span>肯德基</span>
                  <span>1615454</span>
                </li>
                <li>
                  <span class="rindex">2</span>
                  <span>肯德基</span>
                  <span>153424</span>
                </li>
                <li>
                  <span class="rindex">3</span>
                  <span>肯德基</span>
                  <span>1315324</span>
                </li>
                <li>
                  <span>4</span>
                  <span>肯德基</span>
                  <span>1315324</span>
                </li>
                <li>
                  <span>5</span>
                  <span>肯德基</span>
                  <span>1315324</span>
                </li>
                <li>
                  <span>6</span>
                  <span>肯德基</span>
                  <span>1315324</span>
                </li>
                <li>
                  <span>7</span>
                  <span>肯德基</span>
                  <span>1315324</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      activeName: "sale",
      charts: null,
      saleData: [190, 152, 200, 334, 390, 330, 220, 170, 150, 180, 221, 210],
      visiteData: [
        1900, 1502, 1200, 1334, 1390, 2330, 1220, 1570, 1550, 1780, 2021, 2190,
      ],
      date: [],
    };
  },
  mounted() {
    this.charts = echarts.init(this.$refs.charts);
    this.charts.setOption({
      title: {
        text: "销售额趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: this.saleData,
        },
      ],
    });
  },
  watch: {
    activeName() {
      this.charts.setOption({
        title: {
          text: this.title + "趋势",
        },
        series: [
          {
            data: this.activeName == "sale" ? this.saleData : this.visiteData,
          },
        ],
      });
    },
  },
  computed: {
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
  },
  methods: {
    getToday() {
      let date = new Date();
      this.date = [date, date];
    },
    getWeek() {
      let day = new Date();
      let currentDay = day.getDay();
      let Monday = new Date(day.setDate(day.getDate() - currentDay + 1));
      let Sunday = new Date(Monday.getTime() + 6 * 24 * 60 * 60 * 1000);
      this.date = [Monday, Sunday];
    },
    getMonth() {
      const today = new Date();
      const currentMonth = today.getMonth(); // 获取当前月份（0-11，0 表示一月）

      const firstDay = new Date(today.getFullYear(), currentMonth, 1);
      const nextMonth = new Date(today.getFullYear(), currentMonth + 1, 1);
      const lastDay = new Date(nextMonth - 1);
      this.date = [firstDay, lastDay];
    },
    getYear() {
      const today = new Date();
      const currentYear = today.getFullYear(); // 获取当前年份

      const firstDay = new Date(currentYear, 0, 1);
      const lastDay = new Date(currentYear, 11, 31);
      this.date = [firstDay, lastDay];
    },
  },
};
</script>

<style scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0px;
}
.date {
  width: 250px;
}
.right span {
  margin: 0 10px;
}
.carts {
  width: 100%;
  height: 300px;
}

ul {
  list-style: none;
  width: 100%;
  height: 300px;
}

ul li {
  height: 8%;
}

li > :last-child {
  float: right;
}

li > :first-child {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
}
.rindex {
  background-color: black;
  color: white;
}
</style>