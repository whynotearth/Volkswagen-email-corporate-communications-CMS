<template>
  <div class="flex flex-wrap bg-brand-gradient text-white py-4">
    <span class="tg-caption-bold-desktop text-white w-full m-4">
      <slot name="title"></slot>
    </span>
    <slot name="description"></slot>
    <BaseTabs class="w-full" :tabClasses="'text-right'">
      <template #Users class="text-left">
        <span class="text-brand-light-blue-gradient tg-h1-mobile">2634</span>
        <span class="flex items-center text-community"> <ArrowUp class="mr-2" :height="12" />90% </span>
      </template>
      <BaseTab name="Users" selected="true">
        <BaseChart :config="getChartConfig({ label: 'Users', data: usersData })" />
      </BaseTab>
      <template #Opens>
        <span class="text-brand-light-blue-gradient tg-h1-mobile">1634</span>
        <span class="flex items-center text-error"> <ArrowDown class="mr-2" :height="12" />12% </span>
      </template>
      <BaseTab name="Opens">
        <BaseChart :config="getChartConfig({ label: 'Users', data: usersData })" />
      </BaseTab>
      <template #Clicks>
        <span class="text-brand-light-blue-gradient tg-h1-mobile">1256</span>
        <span class="flex items-center text-community"> <ArrowUp class="mr-2" :height="12" />12% </span>
      </template>
      <BaseTab name="Clicks">
        <BaseChart :config="getChartConfig({ label: 'Users', data: usersData })" />
      </BaseTab>
    </BaseTabs>
  </div>
</template>

<script>
import BaseTabs from '@/components/BaseTabs.vue';
import BaseTab from '@/components/BaseTab.vue';
import BaseChart from '@/components/BaseChart.vue';
import ArrowDown from '@/assets/arrow-down-red.svg';
import ArrowUp from '@/assets/arrow-up.svg';
import { colors } from '@/constants/theme.js';

export default {
  name: 'OverviewStats',
  components: {
    BaseTabs,
    BaseTab,
    ArrowDown,
    ArrowUp
  },
  data: () => ({
    // TODO: read from store
    usersData: [100, 500, 100, 200, 300, 800, 900]
  }),
  methods: {
    getChartConfig({ label, data }) {
      const config = {
        type: 'line',
        data: {
          labels: ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'],
          datasets: [
            {
              label,
              data,
              borderWidth: 2,
              backgroundColor: 'transparent',
              borderColor: colors.secondary,
              fill: false
            }
          ]
        },
        options: {
          elements: {
            point: {
              radius: 0
            }
          },
          legend: {
            display: false
          },
          tooltips: false,
          responsive: true,
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            yAxes: [
              {
                ticks: { min: 0, display: false },
                gridLines: {
                  drawBorder: false,
                  display: false
                }
              }
            ],
            xAxes: [
              {
                position: 'bottom',
                gridLines: {
                  drawBorder: false,
                  lineWidth: 1,
                  color: colors.divider
                }
              },
              {
                position: 'top',
                gridLines: {
                  drawBorder: false,
                  display: false
                },
                ticks: {
                  callback: function(value, index, values) {
                    return data[index];
                  }
                }
              }
            ]
          }
        }
      };
      return config;
    }
  }
};
</script>

<style>
.text-brand-light-blue-gradient {
  background: -webkit-linear-gradient(#0374f9, #03b3f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tabs .shadow-4dp {
  box-shadow: none !important;
}
.tabs li {
  border-left: 1px solid rgba(255, 255, 255, 0.12);
}
.tabs li:not(.border-secondary) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
.tabs li a {
  text-align: left !important;
  text-transform: none;
}
</style>
