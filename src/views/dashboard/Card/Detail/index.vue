<template>
  <div>
    <div class="card-header">
      <span>{{ title }}</span>
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
    <div class="card-content">{{ count }}</div>
    <div class="card-charts">
      <slot name="charts"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "count"],
};
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  color: #d9d9d9;
}
.card-content {
  font-size: 30px;
}
.card-charts {
  height: 50px;
}
.card-footer {
  border-top: 1px solid #eee;
}
</style>