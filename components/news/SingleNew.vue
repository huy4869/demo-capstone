<template>
    <div @click="handeDetail">
      <el-image class="w-100 h-100" fill="cover" :src="detailNew.image">
        <div slot="placeholder" class="image-slot">
          <i class="el-icon-loading"></i>
        </div>
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline font-size-20px"></i>
        </div>
      </el-image>
      <h3>{{ detailNew.title }}</h3>
      <p class="news-page-block-date">{{ detailNew.public_date }}</p>
  </div>
</template>
<script>
export default {
  name: 'SingleNew',
  props: {
    detailNew: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    handeDetail() {
      this.$emit('clickItem', this.detailNew)
    }
  }
}
</script>
