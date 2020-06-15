<template>
  <div>
    test

    <br />
    <CloudinaryWidget
      @uploaded="onUpload"
      :uploaderOptions="{
        maxFiles: 1,
        maxImageWidth: 256,
        maxImageHeight: 256
      }"
    >
      <button>upload widget</button>
    </CloudinaryWidget>

    <div style="width: 328px">
      <ApexCharts type="heatmap" height="350" :options="chartOptions" :series="series"></ApexCharts>
    </div>
  </div>
</template>

<script>
import CloudinaryWidget from '@/components/ImageUpload/CloudinaryWidget';
import ApexCharts from 'vue-apexcharts';

export default {
  name: 'DeveloperTesting',
  components: { CloudinaryWidget, ApexCharts },
  data() {
    return {
      chartOptions: {
        chart: {
          height: 350,
          type: 'heatmap',
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          },
          selection: {
            enabled: false
          },
          defaultLocale: 'en',
          locales: [
            {
              name: 'en',
              options: {
                //  shortDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              }
            }
          ]
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#03B3F9'],
        stroke: {
          colors: ['#ffffff'],
          width: 8
        },
        fill: {
          opacity: 1
        },
        xaxis: {
          type: 'datetime',
          // min: 1591574400000,
          // max: 1592092800000,
          tickPlacement: 'between',
          crosshairs: {
            show: false
          },
          labels: {
            rotate: 0,
            format: 'ddd',
            hideOverlappingLabels: false,
            showDuplicates: true,
            trim: true,
            style: {
              color: '#757575',
              fontFamily: 'VWText-Regular'
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          opposite: true
        },
        tooltip: {
          enabled: false
        },
        states: {
          normal: {
            filter: {
              type: 'none'
            }
          },
          hover: {
            filter: {
              type: 'none'
            }
          },
          active: {
            filter: {
              type: 'none'
            }
          }
        },
        plotOptions: {
          heatmap: {
            radius: 0,
            enableShades: false,
            shadeIntensity: 1,
            colorScale: {
              ranges: [
                {
                  from: 0,
                  to: 1,
                  color: '#EDEDED'
                },
                {
                  from: 1,
                  to: 15,
                  color: '#D9EFFF'
                },
                {
                  from: 15,
                  to: 30,
                  color: '#9EDEFD'
                },
                {
                  from: 30,
                  to: 45,
                  color: '#71D2FC'
                },
                {
                  from: 45,
                  to: 60,
                  color: '#3EC3FA'
                },
                {
                  from: 60,
                  to: 75,
                  color: '#03B3F9'
                }
              ]
            }
          }
        },
        grid: {
          show: false
        },
        legend: {
          markers: {
            width: 40,
            height: 10,
            strokeWidth: 100,
            strokeColor: ['#1890FF', '#ED1C24'],
            radius: 0
          },
          formatter: function(seriesName, opts) {
            console.log(seriesName);
            console.log(opts);
            return seriesName;
          },
          itemMargin: {
            horizontal: 8,
            vertical: 10
          },
          position: 'bottom'
          //          markers:{
          //            customHTML: function() {
          //              console.log('<span class="custom-marker"><i class="fas fa-chart-pie"></i></span>');
          //              return '<span class="custom-marker"><i class="fas fa-chart-pie"></i></span>'
          //            }
          //          }
        }
      },
      series: [
        {
          name: '10pm',
          data: [
            [1591574000000, 10],
            [1591660800000, 10],
            [1591747200000, 50],
            [1591833600000, 0],
            [1591920000000, 0],
            [1592006400000, 50],
            [1592092800000, 75]
          ]
        },
        {
          name: '8pm',
          data: [
            [1591574000000, 0],
            [1591660800000, 10],
            [1591747200000, 50],
            [1591833600000, 0],
            [1591920000000, 0],
            [1592006400000, 50],
            [1592092800000, 75]
          ]
        }
        //                {
        //                  name: '6pm',
        //                  data: [
        //                    [1591574400000, 70],
        //                    [1591660800000, 0],
        //                    [1591747200000, 60],
        //                    [1591833600000, 0],
        //                    [1591920000000, 20],
        //                    [1592006400000, 0],
        //                    [1592092800000, 30]
        //                  ]
        //                },
        //                {
        //                  name: '4pm',
        //                  data: [
        //                    [1591574400000, 50],
        //                    [1591660800000, 7],
        //                    [1591747200000, 40],
        //                    [1591833600000, 18],
        //                    [1591920000000, 0],
        //                    [1592006400000, 32],
        //                    [1592092800000, 0]
        //                  ]
        //                },
        //                {
        //                  name: '2pm',
        //                  data: [
        //                    [1591574400000, 5],
        //                    [1591660800000, 65],
        //                    [1591747200000, 0],
        //                    [1591833600000, 16],
        //                    [1591920000000, 77],
        //                    [1592006400000, 0],
        //                    [1592092800000, 0]
        //                  ]
        //                 },
        //                {
        //                  name: '12pm',
        //                  data: [
        //                    [1591574400000, 25],
        //                    [1591660800000, 0],
        //                    [1591747200000, 5],
        //                    [1591833600000, 0],
        //                    [1591920000000, 7],
        //                    [1592006400000, 0],
        //                    [1592092800000, 0]
        //                  ]
        //                },
        //                {
        //                  name: '10am',
        //                  data: [
        //                    [1591574400000, 0],
        //                    [1591660800000, 8],
        //                    [1591747200000, 14],
        //                    [1591833600000, 0],
        //                    [1591920000000, 0],
        //                    [1592006400000, 0],
        //                    [1592092800000, 40]
        //                  ]
        //                },
        //                {
        //                  name: '8am',
        //                  data: [
        //                    [1591574400000, 0],
        //                    [1591660800000, 55],
        //                    [1591747200000, 0],
        //                    [1591833600000, 0],
        //                    [1591920000000, 13],
        //                    [1592006400000, 0],
        //                    [1592092800000, 0]
        //                  ]
        //                },
        //                {
        //                  name: '6am',
        //                  data: [
        //                    [1591574400000, 0],
        //                    [1591660800000, 5],
        //                    [1591747200000, 0],
        //                    [1591833600000, 0],
        //                    [1591920000000, 13],
        //                    [1592006400000, 0],
        //                    [1592092800000, 70]
        //                  ]
        //                },
        //                {
        //                  name: '4am',
        //                  data: [
        //                    [1591574400000, 0],
        //                    [1591660800000, 5],
        //                    [1591747200000, 0],
        //                    [1591833600000, 0],
        //                    [1591920000000, 13],
        //                    [1592006400000, 0],
        //                    [1592092800000, 0]
        //                  ]
        //                 },
        //                {
        //                  name: '2am',
        //                  data: [
        //                    [1591574400000, 30],
        //                    [1591660800000, 5],
        //                    [1591747200000, 0],
        //                    [1591833600000, 0],
        //                    [1591920000000, 73],
        //                    [1592006400000, 0],
        //                    [1592092800000, 40]
        //                  ]
        //                 },
        //                {
        //                  name: '12am',
        //                  data: [
        //                    [1591574400000, 0],
        //                    [1591660800000, 5],
        //                    [1591747200000, 0],
        //                    [1591833600000, 0],
        //                    [1591920000000, 13],
        //                    [1592006400000, 0],
        //                    [1592092800000, 50]
        //                  ]
        //                 }
      ]
    };
  },
  methods: {
    generateData(count) {
      var i = 0;
      var series = [];
      while (i < count) {
        series.push([i * 1000 * 60 * 60, Math.floor(Math.random() * 50)]);
        i++;
      }
      console.log(series);
      return series;
    },
    onUpload(result) {
      console.log(result);
    }
  }
};
</script>
