<template>
  <div>
    <div class="history">
      <div class="container">
        <div id="table_data" class="title">LỊCH SỬ GIAO DỊCH</div>
        <div class="line"></div>
        <div class="history-table">
          <el-table
            ref="productTable"
            :data="histories"
            bitem
            fit
            stripe
            highlight-current-row
            :row-class-name="(row, rowIndex) => 'item-row-table'"
          >
            <el-table-column width="220px" label="Thời gian" prop="created_at"></el-table-column>
            <el-table-column label="Loại giao dịch" prop="type_name" width="260px"></el-table-column>
            <el-table-column label="Số tiền" prop="value_text" width="280px">
              <template slot-scope="{row}">
                <span v-if="row.operator === '-'" class="minus">{{ row.value_text }} point</span>
                <span v-else class="bonus">{{ row.value_text }} point</span>
              </template>
            </el-table-column>
            <el-table-column label="Nội dung" prop="content"></el-table-column>
            <div v-if="histories.length===0" slot="append" class="table-empty">
              <div>
                <div>
                  <img src="~/assets/images/empty.svg" alt="empty" class="empty_img"/>
                </div>
                <div>
                  <span>{{ $t('noti.empty') }}</span>
                </div>
              </div>
            </div>
          </el-table>
          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.per_page"
            :auto-scroll="false"
            @pagination="fetchPackages()"
          />
        </div>
        <div class="map">
          <h4>BIỂU ĐỒ THỂ HIỆN LỢI NHUẬN RÒNG</h4>
          <el-select v-model="year" class="m-2">
            <el-option
              v-for="item in [2021, 2022, 2023]"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <div class="bar-chart">
            <canvas id="myChart" width="20%" height="13%"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
import { GET_HISTORY, INDEX_SET_LOADING } from '~/store/store.const'
import Pagination from '@/components/element-ui/Pagination'

export default {
  name: 'HistoryPage',
  components: { Pagination },
  middleware: 'auth',
  data() {
    return {
      isMounted: false,
      histories: [],
      total: 0,
      max: 360000,
      year: 2022,
      data: [330000, 279000, 238000, 310000, 150000, 90000, 210000, 280000, 240000, 120000, 200000, 320000],
      listQuery: {
        page: 1,
        per_page: 10
      }
    }
  },
  async created() {
  },
  async mounted() {
    const ctx = document.getElementById('myChart')
    const label = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    (() => new Chart(ctx, {
      type: 'bar',
      data: {
        labels: label,
        datasets: [{
          label: '',
          data: this.data,
          backgroundColor: [
            '#FAAD14',
            '#FAAD14',
            '#FAAD14',
            '#FAAD14',
            '#FAAD14',
            '#FAAD14',
            '#FAAD14',
            '#FAAD14',
            '#FAAD14',
            '#FAAD14',
            '#FAAD14',
            '#FAAD14'
          ],
          borderWidth: 1,
          barPercentage: 0.7
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              min: 0,
              max: this.max,
              stepSize: (this.max / 9),
              color: '#FFFFFF',
              padding: 10,
              font: {
                size: 16,
                family: 'Montserrat',
                weight: 400
              },
              callback(value, ticks) {
                if (ticks === 4) {
                  return ''
                }
                return '$' + value
              }
            },
            grid: {
              drawTicks: false,
              display: true,
              borderWidth: 2,
              borderColor: '#FFFFFF',
              color: '#FFFFFF',
              lineWidth: (context) => {
                if (context.tick.$context.index === 0) {
                  return 2
                } else if (context.tick.$context.index === 4) {
                  return 0
                } else {
                  return 0.5
                }
              }
            }
          },
          x: {
            display: true,
            padding: 10,
            font: {
              family: 'Montserrat',
              weight: 400
            },
            ticks: {
              padding: 0,
              color: '#FFFFFF'
            },
            grid: {
              display: false,
              borderWidth: 0
            }
          }
        }
      }
    }))()
    Chart.defaults.font.size = 14
    Chart.defaults.font.color = '#FFFFFF'
    await this.fetchPackages()
    this.isMounted = true
  },
  methods: {
    async fetchPackages() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const response = await this.$store.dispatch(GET_HISTORY, this.listQuery)
      if (response.status_code === 200) {
        this.histories = response.data.data
        this.total = response.data.total
        setTimeout(() => {
          const element = document.getElementById('table_data')
          element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
        }, this.isMounted ? 100 : 500)
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
