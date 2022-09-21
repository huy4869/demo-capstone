<template>
  <div>
    <div id="main">
      <div class="container">
        <el-row class="packages">
          <el-col v-for="pack in packages" :key="pack.id" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="single">
              <img class="logo" :src="pack.image" alt="">
              <p class="name">{{ pack.name }}</p>
              <p class="price">{{ pack.price ? ('$'  + pack.price_text) : 'Free bot' }}<span v-if="pack.price" class="point">~ {{ pack.price_text }} point</span></p>
              <div class="activity">
                <p><img :src="require('~/assets/images/icons/package/check.svg')" alt=""><span>Thu phí {{ pack.return_price }}% lợi nhuận/tháng</span></p>
                <p v-if="pack.com_personal"><img :src="require('~/assets/images/icons/package/check.svg')" alt=""><span>Nhận ${{ pack.com_personal }}/lot giao dịch cá nhân</span></p>
                <p v-if="pack.com_system"><img :src="require('~/assets/images/icons/package/check.svg')" alt=""><span>Nhận ${{ pack.com_system }}/lot giao dịch F1, F2</span></p>
                <p v-if="pack.id"><img :src="require('~/assets/images/icons/package/check.svg')" alt=""><span>Xây dựng hệ thống thu nhập trọn đời</span></p>
                <p v-if="pack.days"><img :src="require('~/assets/images/icons/package/check.svg')" alt=""><span>Hạn sử dụng: {{ pack.days }} ngày</span></p>
                <p v-if="pack.manager_fee"><img :src="require('~/assets/images/icons/package/check.svg')" alt=""><span>Bảo lãnh giao dịch: {{ pack.manager_fee }}%/tháng</span></p>
                <p v-if="pack.max_dep_text"><img :src="require('~/assets/images/icons/package/check.svg')" alt=""><span>Đầu tư tối đa: ${{ pack.max_dep_text }}</span></p>
                <p v-if="pack.direct_discount"><img :src="require('~/assets/images/icons/package/check.svg')" alt=""><span>Chiết khấu trực tiếp: {{ pack.direct_discount }}%</span></p>
              </div>
              <div class="buy-button">
                <button v-if="$auth.user && $auth.user.package && pack.id !== 0 && $auth.user.package.package_id === pack.id" class="button footer-right-submit" @click="buyPackage(pack, 0)">Gia hạn ({{ $auth.user.package.day_expires }} ngày)</button>
                <el-button v-else-if="($auth.user && $auth.user.package && $auth.user.package.package_id > pack.id) || ($auth.user && $auth.user.transaction_code && pack.id === 0)" class="button" style="display: none" @click="buyPackage(pack)"></el-button>
                <button v-else class="button footer-right-submit" @click="buyPackage(pack, 1)">Mua gói</button>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="$auth.user" class="user">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="invite">
              <p class="title">Liên kết giới thiệu của bạn</p>
              <div class="form">
                <label>ID giới thiệu của bạn</label>
                <input disabled :value="$auth.user.invite_code">
                <img class="copy" :src="require('~/assets/images/icons/copy.svg')" @click="copy($auth.user.invite_code)">
              </div>
              <div class="form">
                <label>Link giới thiệu của bạn</label>
                <input disabled :value="url">
                <img class="copy" :src="require('~/assets/images/icons/copy.svg')" @click="copy(url)">
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="invite">
              <p class="title">Liên kết giới thiệu của bạn</p>
              <div class="notice">
                <p>Chia sẻ ID giới thiệu / liên kết của bạn với một người bạn không có tài khoản.</p>
                <p>Bạn sẽ nhận được hoa hồng khi người được giới thiệu mua gói Basic hoặc Master thành công.</p>
              </div>
            </div>
          </el-col>
        </el-row>
        <div v-if="$auth.user" class="invite-users">
          <p class="title">DANH SÁCH NGƯỜI ĐƯỢC GIỚI THIỆU</p>
          <el-button class="button history-button" @click="$router.push('/history')">Lịch sử giao dịch</el-button>
          <el-table
            ref="productTable"
            :data="users"
            bitem
            fit
            stripe
            highlight-current-row
            :row-class-name="(row, rowIndex) => 'item-row-table'"
            class="table_invite_pc"
          >
            <el-table-column
              type="index"
              class-name="text-center"
              :width="$device.isTablet?70:80"
              label="STT"
            />
            <el-table-column label="Tên" prop="name" :width="$device.isTablet?200:250"></el-table-column>
            <el-table-column label="Email" prop="email" :width="$device.isTablet?250:340"></el-table-column>
            <el-table-column label="Gói" prop="package" :width="$device.isTablet?130:''">
              <template slot-scope="{row}">
                {{ row.package ? row.package.name : '' }}
              </template>
            </el-table-column>
            <el-table-column label="Cấp bậc" width="200" prop="role_name"></el-table-column>
            <el-table-column
              :width="$device.isTablet?150:175"
              prop="action"
            >
              <template slot-scope="{row}">
                <el-button size="mini" @click.stop="detail(row)">
                  Xem chi tiết
                </el-button>
              </template>
            </el-table-column>
            <div v-if="users.length===0" slot="append" class="table-empty">
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

          <div class="table_invite_mobile">
              <table>
                <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Tên</th>
                  <th scope="col">Email</th>
                  <th scope="col">Gói</th>
                  <th scope="col">Cấp bậc</th>
                  <th scope="col"> </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(value, index) in users" :key="index">
                  <td data-label="STT">{{ index + 1 }}</td>
                  <td data-label="Tên">
                    {{value.name}}
                  </td>
                  <td data-label="Email">
                    {{value.email}}
                  </td>
                  <td data-label="Gói">
                    {{value.package ? value.package.name : ''}}
                  </td>
                  <td data-label="Cấp bậc">
                    {{value.role_name}}
                  </td>
                  <td data-label="">
                    <el-button size="mini" @click.stop="detail(value)">
                      Xem chi tiết
                    </el-button>
                  </td>
                </tr>
                </tbody>
              </table>
              <hr/>
              <div v-if="users.length === 0" slot="append" class="table-empty">
                <div>
                  <div>
                    <img class="empty_img" src="~/assets/images/empty.svg" alt="empty"/>
                  </div>
                  <div>
                    <span>{{ $t('noti.empty') }}</span>
                  </div>
                </div>
              </div>
          </div>

          <pagination
            v-if="total > 0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.per_page"
            :auto-scroll="false"
            @pagination="fetchInvite()"
          />
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="transactionDialog" title="MUA GÓI" width="400px" top="25vh" class="dialog-transaction"
      :center="true" :destroy-on-close="true">
      <transaction-modal @submit="saveTransaction"/>
    </el-dialog>
  </div>
</template>

<script>
import {
  BUY_PACKAGE,
  GET_LIST_INVITE,
  GET_LIST_PACKAGES,
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS
} from '~/store/store.const'
import TransactionModal from '@/components/modals/transaction'
import Pagination from '@/components/element-ui/Pagination'

export default {
  name: 'IndexPage',
  components: { TransactionModal, Pagination },
  data() {
    return {
      packages: [],
      selectedPack: {},
      users: [],
      total: 0,
      url: this.$auth.user ? (process.env.APP_URL + 'register/' + this.$auth.user.invite_code) : '',
      listQuery: {
        page: 1,
        per_page: 5
      },
      transactionDialog: false
    }
  },
  async created() {
    if (!this.$auth.loggedIn) {
      this.$router.push('/login')
      return
    }
    await this.fetchPackages()
    await this.fetchInvite()
  },
  methods: {
    async fetchPackages() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const response = await this.$store.dispatch(GET_LIST_PACKAGES)
      if (response.status_code === 200) {
        const packages = response.data.data
        this.packages = [
          {
            id: 0,
            name: 'Free',
            price: 0,
            discount: 0,
            return_price: 30,
            image: require('~/assets/images/icons/package/free.svg')
          }
        ]
        packages.forEach(pack => {
          pack.image = pack.id === 1 ? require('~/assets/images/icons/package/basic.svg') : require('~/assets/images/icons/package/crown.svg')
          const prices = pack.copy_return_price
          pack.return_price = prices[0].fee
          this.packages.push(pack)
        })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async fetchInvite() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const response = await this.$store.dispatch(GET_LIST_INVITE, this.listQuery)
      if (response.status_code === 200) {
        this.users = response.data.data
        this.total = response.data.total
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    detail(user) {
      this.$router.push({ path: '/network', query: { invite_code: user.invite_code }})
    },
    buyPackage(pack, type) {
      if (!this.$auth.loggedIn) {
        this.$router.push('/login')
      } else if (this.$auth.user.transaction_code) {
        this.$confirm(type === 1
          ? `Bạn có chắc muốn mua gói ${pack.name} không?`
          : `Bạn có chắc muốn gia hạn gói ${pack.name} không?`,
        type === 1
          ? 'Mua gói'
          : 'Gia hạn gói',
        {
          cancelButtonText: 'Huỷ',
          confirmButtonText: 'Đồng ý'
        })
          .then(_ => {
            const params = {
              package_id: pack.id
            }
            this.confirmBuyPackage(params, type)
          })
          .catch(_ => {
          })
      } else {
        this.selectedPack = pack
        this.transactionDialog = true
      }
    },
    async confirmBuyPackage(params, type) {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const response = await this.$store.dispatch(BUY_PACKAGE, params)
      if (response.status_code === 200) {
        await this.$auth.fetchUser()
        await this.fetchPackages()
        this.$store.commit(INDEX_SET_SUCCESS,
          { show: true, text: type === 1
            ? this.$t('noti.buy_success')
            : response.message })
      } else {
        this.$store.commit(INDEX_SET_ERROR, { show: true, text: 'Lỗi', message: response.message })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async saveTransaction(transaction_code) {
      await this.confirmBuyPackage({
        transaction_code,
        package_id: this.selectedPack.id
      })
      this.transactionDialog = false
    },
    copy(data) {
      const textarea = document.createElement('textarea')
      textarea.value = data
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      this.$store.commit(INDEX_SET_SUCCESS, { show: true, text: 'Sao chép thành công' })
    }
  }
}
</script>
