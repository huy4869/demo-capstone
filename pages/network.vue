<template>
  <div id="main">
    <div class="container">
      <div class="network_component">
        <h1 class="profit_network_title">{{ $t('network.profit_title') }}</h1>
        <div class="hr_title"></div>
        <span class="total_profit">{{ $t('network.total_profit') }}<span
          class="total_profit_value">{{ '$' + total_profit }}</span></span>
      </div>
    </div>
    <chart :data="userRoot"></chart>
  </div>
</template>

<script>
import Chart from '@/components/chart/Chart'
import { GET_LST_TREE, INDEX_SET_ERROR, INDEX_SET_LOADING } from '~/store/store.const'

export default {
  name: 'NetworkComponent',
  components: {
    Chart
  },
  middleware: 'auth',
  data() {
    return {
      invite_code: '',
      total_profit: '',
      userRoot: {},
      lstUser: []
    }
  },
  async created() {
    this.invite_code = this.$route.query.invite_code
    await this.fetchTree()
  },
  methods: {
    async fetchTree() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const data = await this.$store.dispatch(GET_LST_TREE, this.invite_code)
        switch (data.status_code) {
          case 200:
            this.userRoot = data.data.tree
            this.total_profit = data.data.total_text
            break
          default:
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.message })
            break
        }
      } catch (err) {
        this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
