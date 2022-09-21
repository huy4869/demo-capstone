<template>
  <div class="home news-page new-detail">
    <div class="container">
      <h2>{{ newData.title }}</h2>
      <img v-if="newData.image" class="w-100 h-100 detail-image" :alt="newData.title" :src="newData.image"/>
        <div v-else class="image-slot">
          <i class="el-icon-picture-outline font-size-20px"></i>
        </div>

      <div class="new-detail-content" v-html="newData.content">
      </div>
      <div class="news-page-border"></div>
      <div class="new-other" data-aos="fade-up" data-aos-duration="400" data-aos-delay="0" data-aos-easing="ease-in-out">
        <h4 class="new-other-title uppercase">Tin tức khác</h4>
        <div class="news-page-main">
          <div v-for="(product, index) in listNews" :key="'new'+index" class="news-page-block">
            <single-new :detail-new="product" @clickItem = 'handeDetail'/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GET_DETAIL_NEW, GET_LIST_NEWS, INDEX_SET_LOADING } from '@/store/store.const'
import SingleNew from '@/components/news/SingleNew'
import { removeVietnameseTones, textToSlug } from '@/utils/utils'

export default {
  name: 'DetailNew',
  components: { SingleNew },
  data() {
    return {
      newData: {},
      listNews: {},
      slug: this.$route.params.slug,
      listQuery: {
        page: 1,
        per_page: 3
      }
    }
  },
  created() {
    const dataId = this.slug.split('.')
    this.id = dataId[dataId.length - 1]
    this.detailNew()
    this.getList()
  },
  methods: {
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
      this.$router.push({ path: this.slugName(product.title) + '.' + product.id, replace: true })
    },
    async detailNew() {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const res = await this.$store.dispatch(GET_DETAIL_NEW, this.id)
        const { status_code, data } = res
        if (status_code === 200) {
          this.newData = data
        }
      } catch (e) {
        console.log(e)
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
