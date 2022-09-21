<template>
  <div class="add-fund">
    <div class="note">
      <p>Vui lòng chuyển khoản vào số tài khoản dưới đây với nội dung:</p>
      <p class="bank-note">{{ bank.content + '_' + $auth.user.email }}</p>
    </div>
    <div class="bank-information">
      <p>{{ bank.bank_name }}</p>
      <p>Chủ tài khoản: {{ bank.bank_account_name }}</p>
      <p>Số tài khoản: {{ bank.bank_account }}</p>
    </div>
    <p class="error">Lưu ý: Point sẽ được cộng sau 1 - 24 giờ</p>
  </div>
</template>

<script>
import { INDEX_SET_LOADING, GET_BANK_ACCOUNT } from '@/store/store.const'

export default {
  name: 'AddFundModal',
  // eslint-disable-next-line vue/require-prop-types
  data() {
    return {
      bank: {}
    }
  },
  created() {
    this.fetchAccount()
  },
  methods: {
    async fetchAccount() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const response = await this.$store.dispatch(GET_BANK_ACCOUNT)
      if (response.status_code === 200) {
        this.bank = response.data
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
