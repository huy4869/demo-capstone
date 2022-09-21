<template>
  <div>
    <div class="home news-page new-home">
      <div class="container" style="margin-bottom: 3rem">
        <div data-aos="fade-up" data-aos-duration="400" data-aos-delay="0" data-aos-easing="ease-in-out">
          <div class="news-page-main">
            <div v-for="(product, index) in listNews" :key="'new'+index" class="news-page-block">
              <single-new :detail-new="product" @clickItem = 'handeDetail'/>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <button class="button-info" @click="handleNews">Xem thêm</button>
      </div>
    </div>
  </div>
</template>
<script>
import SingleNew from '@/components/news/SingleNew'
import { GET_LIST_NEWS, INDEX_SET_LOADING } from '@/store/store.const'
import { removeVietnameseTones, textToSlug } from '@/utils/utils'
export default {
  name: 'NewsHome',
  components: { SingleNew },
  data() {
    return {
      listNews: [],
      isVertical: false,
      listQuery: {
        page: 1,
        per_page: 6
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleNews() {
      this.$router.push('/news')
    },
    async getList() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(GET_LIST_NEWS, this.listQuery)
        const { data, status_code } = response
        if (status_code === 200) {
          this.listNews = data.data
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_LOADING, false)
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    },
    slugName(name) {
      if (name) {
        return textToSlug(removeVietnameseTones(name))
      }
      return ''
    },
    handeDetail(product) {
      this.$router.push('news/detail/' + this.slugName(product.title) + '.' + product.id)
    }
  }
}
</script>
