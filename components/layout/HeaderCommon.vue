<template>
  <div>
    <div id="header-top">
      <div class="container header-top-block">
        <div class="header-top-left">
          EZ TECHNOLOGY SOLUTION., JSC
        </div>
        <div class="header-top-right flex  items-center">
          <div class="header-top-right-phone items-center flex">
            <img src="@/assets/images/icons/phone.svg" alt="phone">Hotline:&nbsp;
            <a style="margin-left: 4px" href="tel:0933922291">093 3922 291</a>
          </div>
          <div class="header-top-right-address items-center flex">
            <img src="@/assets/images/icons/map-ping.svg" alt="email"> Địa chỉ : 16 Lê Quang Đạo, Phường Phú Đô , Nam Từ Liêm , Hà Nội
          </div>
        </div>
      </div>
    </div>
    <!-- header top -->
    <div id="header-main">
      <div class="container flex items-center justify-between">
        <div class="flex items-center">
          <a href="/">
            <img class="logo" src="@/assets/images/banner/logo.svg" alt="">
          </a>
        </div>
        <div v-if="!$auth.loggedIn" class="header-main-actions flex">
          <button class="button-primary" @click="handeClick('/login')">Đăng nhập</button>
          <button class="button-info" @click="handeClick('/register')">Đăng ký</button>
        </div>
        <div v-else class="header-main-actions">
          <div class="point">
            <span>Số dư: </span><span class="money">{{ $auth.user.balance_text }} point</span>
          </div>
          <button class="button" @click="addFundDialog = true">Nạp tiền</button>
          <div class="tab-list">
            <el-dropdown class="cursor-pointer d-flex" trigger="click">
            <span class="el-dropdown-link auth-loggedIn">
               <span class="email">{{ $auth.user.email }}</span>
              <img class="image-dropdown" src="~/assets/images/icons/arrow_down.svg" alt="">
            </span>
            <p class="role">{{ $auth.user.role_name }}</p>
              <template #dropdown>
                <el-dropdown-menu class="dropdown-auth-loggedIn">
                  <el-dropdown-item v-for="(tab, index) in listTab" :key="index" :command="index">
                    <div class="select-language d-flex" @click="handeClick(tab.link)">
                      <div class="flex items-center flex">
                        <img style="width: 18px; height: 18px; margin-right: 11px" :src="tab.icon" alt="copy">
                        <div class="language-name pd-l-10">{{ tab.name }}</div>
                      </div>
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div class="select-language d-flex" @click="logout">
                      <div class="flex items-center flex">
                        <img style="width: 18px; height: 18px; margin-right: 11px" src="~/assets/images/icons/log_out.svg" alt="copy">
                        <div class="language-name pd-l-10">Đăng xuất</div>
                      </div>
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <!--  -->
        <div class=" header-main-menu-mobile">
          <label for="nav-mobile-input">
            <div class="menu-mobile pointer">
              <img src="@/assets/images/icons/menu.svg" alt="">
            </div>
          </label>
          <input id="nav-mobile-input" type="checkbox" name="" hidden class="nav-input">
          <label for="nav-mobile-input" class="nav-overlay"></label>
          <div class="nav_mobile">
            <div class="header-top">
              <div class="flex items-center justify-center name-company">
                EZ TECHNOLOGY SOLUTION., JSC
              </div>
            </div>
            <div class="flex justify-between items-center menu-mobile-top ">
              <div class="img-logo">
                <a href="/">
                <img src="@/assets/images/banner/logo.svg" alt="">
                </a>
              </div>
              <label for="nav-mobile-input" class="icon-close">
                <img id="close_btn" src="@/assets/images/icons/close.svg" alt="">
              </label>
            </div>
            <div v-if="$auth.loggedIn" class="menu-mobile-alt ">
              <div class="info_header">
                <div class="left">
                  <span class="email">{{ $auth.user.email }}</span>
                  <p class="role_text">{{ $auth.user.role_name }}</p>
                </div>
                <div class="right">
                 <span class="money">{{ $auth.user.balance_text }} point</span>
                </div>
              </div>
              <ul>
                <li @click="handeClickInvest()">
                  <img style="width: 18px; height: 18px; margin-right: 11px" :src="require('@/assets/images/icons/tree/coin.svg')" alt="copy">Nạp tiền</li>
                <li @click="handeClick('/withdraw')">
                  <img style="width: 18px; height: 18px; margin-right: 11px" :src="require('@/assets/images/icons/file.svg')" alt="copy">Lịch sử rút tiền</li>
                <li @click="handeClick('/detail')">
                  <img style="width: 18px; height: 18px; margin-right: 11px" :src="require('@/assets/images/icons/usercircle.svg')" alt="copy">Thông tin cá nhân</li>
                <li @click="logout">
                  <img style="width: 18px; height: 18px; margin-right: 11px" src="~/assets/images/icons/log_out.svg" alt="copy">
                  <div class="language-name pd-l-10">Đăng xuất</div>
                </li>
              </ul>
            </div>
            <div v-if="!$auth.loggedIn" class="header-main-actions-mobile flex">
              <button class="button-primary" @click="handeClick('/login')">Đăng nhập</button>
              <button class="button-info" @click="handeClick('/register')">Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end header main -->
    <el-dialog :visible.sync="addFundDialog" title="NẠP TIỀN" width="600px" top="10vh" class="dialog-add-fund" :center="true">
      <add-fund-modal />
    </el-dialog>
  </div>

</template>
<script>
import AddFundModal from '@/components/modals/add_fund'
import { INDEX_SET_LOADING, AUTH_LOGOUT } from '@/store/store.const'

export default {
  name: 'HeaderCommon',
  components: { AddFundModal },
  data() {
    return {
      listTab: [
        {
          id: 1,
          name: 'Lịch sử rút tiền',
          icon: require('@/assets/images/icons/file.svg'),
          link: '/withdraw'
        },
        {
          id: 2,
          name: 'Thông tin cá nhân',
          icon: require('@/assets/images/icons/usercircle.svg'),
          link: '/detail'
        }
      ],
      addFundDialog: false
    }
  },
  methods: {
    async handeClick(link) {
      await this.$router.push(link)
      document.getElementById('close_btn').click()
    },
    handeClickInvest() {
      document.getElementById('close_btn').click()
      setTimeout(() => {
        this.addFundDialog = true
      }, 300)
    },
    async logout() {
      this.$store.commit(INDEX_SET_LOADING, true)
      await this.$auth.logout()
      try {
        await this.$store.dispatch(AUTH_LOGOUT)
      } catch (e) {
      }
      if (this.$route.path !== '/') {
        await this.$router.push('/')
      } else {
        window.location.reload()
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
