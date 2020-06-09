<template>
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader :title="'Memo Overview'" :toLink="{ name: 'Stats' }" />
    </template>
    <template #content>
      <div class="flex flex-col">
        <div class="container px-0 py-4 md:px-6 select-none">
          <BaseDropdown
            class="relative bg-surface text-left m-4"
            placeholder="Schedule time"
            :options="dates"
            :icon="'https://res.cloudinary.com/whynotearth/image/upload/v1591633121/Volkswagen/cms/calendar_v7nvia.png'"
            v-model="date"
          >
            <template #title="{ selectedOption }">
              <span v-if="dates.length === 0" class="text-gray-500">
                No Option!
              </span>
              <span v-else-if="selectedOption" class="text-black">
                {{ selectedOption }}
              </span>
            </template>
            <template #option="{ option }">
              <span>
                {{ option }}
              </span>
            </template>
          </BaseDropdown>
          <OverviewStats>
            <template #title>Memo Overview</template>
          </OverviewStats>
          <BaseChart :config="getChartConfig({ label: 'Users', data: usersData })" />
        </div>
      </div>
    </template>
    <template #footer>
      <NavigationBottom />
    </template>
  </LayoutFixedFooter>
</template>

<script>
import LayoutFixedFooter from '@/components/LayoutFixedFooter';
import NavigationBottom from '@/components/BaseNavigationBottom';
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import BaseDropdown from '@/components/BaseDropdown';
import OverviewStats from '@/components/OverviewStats';
import BaseChart from '@/components/BaseChart.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { colors } from '@/constants/theme.js';

export default {
  name: 'StatsOverviewMemos',
  components: { BaseAppBarHeader, NavigationBottom, LayoutFixedFooter, BaseChart, BaseDropdown, OverviewStats },
  computed: {
    ...mapGetters('memo', ['get_date']),
    date: {
      get() {
        return this.get_date;
      },
      set(value) {
        this.update_date(value);
      }
    },
    dates() {
      return ['Last 7', 'Last 30', 'all time'];
    }
  },
  data: () => ({
    // TODO: read from store
    usersData: [100, 500, 100, 200, 300, 800, 900]
  }),
  methods: {
    ...mapMutations('memo', ['update_date']),
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
              backgroundColor: colors.secondary,
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
