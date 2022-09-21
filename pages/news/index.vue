<template>
  <div class="home news-page">
    <div class="container">
      <div class="news-page-banner flex items-center justify-between" data-aos="fade-up" data-aos-duration="400" data-aos-delay="0" data-aos-easing="ease-in-out">
        <h3>Tin tức sự kiện</h3>
        <div v-if="isVertical" class="flex items-center news-page-banner-filter">
          <div @click="handeTable('isVertical')"><img src="@/assets/images/icons/menu-news-more.svg" alt=""></div>
          <div class="bg-icon-new"><img src="@/assets/images/icons/menu-news-hamburger-active.svg" alt=""></div>
        </div>
        <div v-else class="flex items-center news-page-banner-filter">
          <div class="bg-icon-new"><img src="@/assets/images/icons/menu-news-more-active.svg" alt=""></div>
          <div @click="handeTable('isHorizontal')"><img src="@/assets/images/icons/menu-news-hamburger.svg" alt=""></div>
        </div>
      </div>
      <div class="news-page-border"></div>
      <div v-if="!isVertical" class="news-page-main">
        <div v-for="(product, index) in listNews" :key="'new'+index" class="news-page-block" data-aos="fade-up" data-aos-duration="400" data-aos-delay="0" data-aos-easing="ease-in-out">
          <single-new :detail-new="product" @clickItem = 'detailNew'/>
        </div>
      </div>
       <div v-else class="news-page-main-vertical">
         <div v-for="(product, index) in listNews" :key="'new-vertical'+index" class="news-page-block-vertical" data-aos="fade-up" data-aos-duration="400" data-aos-delay="0" data-aos-easing="ease-in-out" @click="detailNew(product)">
           <el-image class="w-100 h-100" fill="cover" :src="product.image">
             <div slot="placeholder" class="image-slot">
               <i class="el-icon-loading"></i>
             </div>
             <div slot="error" class="image-slot">
               <i class="el-icon-picture-outline font-size-20px"></i>
             </div>
           </el-image>
           <div>
             <h3>{{ product.title }} </h3>
             <p class="news-page-block-vertical-date">{{ product.public_date }}</p>
             <div class="news-page-block-vertical-content">
               {{ product.sub_content }}
             </div>
           </div>
         </div>
     </div>
      <infinite-loading
          v-if="listNews.length"
          ref="infiniteLoading"
          spinner="spiral"
          class="flex items-center justify-center"
          style="width: 100%"
          @infinite="infiniteScroll">
        <template slot="no-more">
          <div class="no_more_message">
          </div>
        </template>
        <template slot="no-results">
          <div class="no_more_message">
          </div>
        </template>
      </infinite-loading>
    </div>
  </div>
</template>
<script>
import SingleNew from '@/components/news/SingleNew'
import { GET_LIST_NEWS, INDEX_SET_LOADING } from '@/store/store.const'
import { removeVietnameseTones, textToSlug } from '@/utils/utils'
export default {
  name: 'NewsPage',
  components: { SingleNew },
  data() {
    return {
      listNews: [],
      isVertical: false,
      listQuery: {
        page: 1,
        per_page: 9
      }
    }
  },
  watch: {
    isVertical() {
      this.$refs.infiniteLoading.stateChanger.reset()
      this.listQuery.page = 1
      this.getList()
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handeTable(data) {
      if (data === 'isVertical') {
        this.isVertical = false
      } else {
        this.isVertical = true
      }
    },
    infiniteScroll($state) {
      setTimeout(async() => {
        this.listQuery.page++
        try {
          const resp = await this.$store.dispatch(GET_LIST_NEWS, this.listQuery)
          console.log(resp)
          if (resp.status_code === 200) {
            if (resp.data.data.length > 1) { // check if any left
              resp.data.data.forEach(item => this.listNews.push(item))
              $state.loaded()
            } else {
              $state.complete()
            }
          }
        } catch (err) {
          console.log(err)
        }
      }, 1000)
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
    detailNew(product) {
      this.$router.push('news/detail/' + this.slugName(product.title) + '.' + product.id)
    }
  }
}
</script>
