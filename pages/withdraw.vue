<template>
  <div>
    <div class="history">
      <div class="container">
        <div class="title">LỊCH SỬ RÚT TIỀN</div>
        <div class="line">
        </div>
        <div class="status-label">Trạng thái</div>
        <div class="button-row">
          <el-select v-model="statusValue" @change="fetchWithdraw()">
            <el-option
              v-for="status in statusList"
              :key="status.value"
              :label="status.value"
              :value="status.key">
            </el-option>
          </el-select>
          <button class="button" @click="withdrawDialog = true">Tạo yêu cầu rút tiền</button>
        </div>
        <div class="history-table" id="table_data">
          <el-table
            ref="productTable"
            :data="withdraws"
            bitem
            fit
            stripe
            highlight-current-row
            :row-class-name="(row, rowIndex) => 'item-row-table'"
          >
            <el-table-column width="210px" label="Thời gian" prop="created_at"></el-table-column>
            <el-table-column label="Số tiền" prop="price_text" width="260px">
              <template slot-scope="{row}">
                {{ row.price_text }} ~ {{ row.vnd_text }}
              </template>
            </el-table-column>
            <el-table-column label="Tài khoản nhận" prop="bank_account_name">
              <template slot-scope="{row}">
                {{ row.bank_account }} - Ngân hàng {{ row.bank_name }}
              </template>
            </el-table-column>
            <el-table-column label="Trạng thái" prop="status_name">
              <template slot-scope="{row}">
                <span :style="{ 'color': statusColor[row.status] }">{{ row.status_name }}</span>
              </template>
            </el-table-column>
            <div v-if="withdraws.length===0" slot="append" class="table-empty">
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
            @pagination="fetchWithdraw()"
          />
        </div>
        <div class="mobile-table">
          <div class="withdraw_table_mobile">
            <table>
              <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Ngày</th>
                <th scope="col">Số tiền</th>
                <th scope="col">Ngân hàng</th>
                <th scope="col">Số tài khoản</th>
                <th scope="col">Trạng thái</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(row, index) in withdraws" :key="index">
                <td data-label="STT">{{ index + (listQuery.page - 1) * listQuery.per_page + 1 }}</td>
                <td data-label="Ngày">
                  {{row.created_at}}
                </td>
                <td data-label="Số tiền">
                  {{ row.price_text }} ~ {{ row.vnd_text }}
                </td>
                <td data-label="Ngân hàng">
                  {{ row.bank_name }}
                </td>
                <td data-label="Số tài khoản">
                  {{ row.bank_account }}
                </td>
                <td data-label="Trạng thái">
                  <span :style="{ 'color': statusColor[row.status] }">{{ row.status_name }}</span>
                </td>
              </tr>
              </tbody>
            </table>
            <hr/>
            <div v-if="withdraws.length===0" slot="append" class="table-empty">
              <div>
                <div>
                  <img src="~/assets/images/empty.svg" alt="empty"/>
                </div>
                <div>
                  <span>{{ $t('noti.empty') }}</span>
                </div>
              </div>
            </div>
          </div>
          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.per_page"
            :auto-scroll="false"
            @pagination="fetchWithdraw()"
          />
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="withdrawDialog" title="TẠO YÊU CẦU RÚT TIỀN"
               class="dialog-add-fund dialog-withdraw" :center="true" :destroy-on-close="true">
      <withdraw-modal @success="submitSuccess"/>
    </el-dialog>
  </div>
</template>

<script>
import { GET_STATUS_LIST, GET_WITHDRAW, INDEX_SET_LOADING } from '~/store/store.const'
import Pagination from '@/components/element-ui/Pagination'
import WithdrawModal from '@/components/modals/withdraw'

export default {
  name: 'HistoryPage',
  components: { Pagination, WithdrawModal },
  middleware: 'auth',
  data() {
    return {
      withdraws: [],
      total: 0,
      max: 360000,
      year: 2022,
      data: [330000, 279000, 238000, 310000, 150000, 90000, 210000, 280000, 240000, 120000, 200000, 320000],
      statusList: [],
      statusColor: {
        '1': '#FAAD14',
        '2': '#00C508',
        '3': '#FF4D4F',
        '4': '#FF4D4F'
      },
      statusValue: -1,
      withdrawDialog: false,
      listQuery: {
        page: 1,
        per_page: 10,
        'filters[0][key]': 'status'
      }
    }
  },
  async created() {
    await this.fetchWithdraw()
  },
  mounted() {
    this.fetchStatusList()
  },
  methods: {
    async fetchWithdraw() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      if (this.statusValue !== -1) {
        this.listQuery['filters[0][data]'] = this.statusValue
      } else {
        delete this.listQuery['filters[0][data]']
      }
      const response = await this.$store.dispatch(GET_WITHDRAW, this.listQuery)
      if (response.status_code === 200) {
        this.withdraws = response.data.data
        this.total = response.data.total
        const element = document.getElementById('table_data')
        element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async fetchStatusList() {
      const response = await this.$store.dispatch(GET_STATUS_LIST)
      if (response.status_code === 200) {
        this.statusList = response.data
      }
    },
    async submitSuccess() {
      this.withdrawDialog = false
      this.statusValue = -1
      await this.$auth.fetchUser()
      this.fetchWithdraw()
    }
  }
}
</script>
