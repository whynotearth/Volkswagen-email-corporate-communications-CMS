<template>
  <div>
    <ApexCharts type="heatmap" height="350" :options="options" :series="series"></ApexCharts>
  </div>
</template>

<script>
import ApexCharts from 'vue-apexcharts';

export default {
  name: 'BaseHeatmapChart',
  components: { ApexCharts },
  props: {
    options: {
      type: Object,
      required: true
    },
    series: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>
.apexcharts-legend-series {
  position: relative;
  margin: 6px 0px !important;
}
.apexcharts-legend-text {
  position: absolute !important;
  top: 14px;
  right: 3px;
}
.apexcharts-legend-marker {
  margin-right: 4px;
}
.apexcharts-legend {
  overflow: hidden !important;
  padding: 10px !important;
  flex-wrap: unset !important;
}
</style>
