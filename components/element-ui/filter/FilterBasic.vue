<template>
  <div class="filter_basic">
    <div class="title_filter">
      <p class="title_text">
        {{ dataFilter.title }}
        <img v-if="(listValue.length > 0) && (showListFilter === false)" src="/assets/images/icons/red_dot.svg" alt="">
      </p>
      <img
          v-if="hiddenCollapse != true" :class="['show_hide_filter', {hide_filter: (showListFilter === false)}]"
          src="/assets/images/icons/arrow-down-bold.svg" alt="" @click="showListFilter = !showListFilter">
    </div>
    <div v-show="showListFilter">
      <el-checkbox-group v-model="listValue">
        <div v-for="(price, index) in dataFilter.list" :key="index">
          <el-checkbox v-if="checkShow(index)" :label="price[itemValue]" :value="price[itemValue]">
            {{ price[itemName] }}
          </el-checkbox>
        </div>
      </el-checkbox-group>
      <span v-if="(loadMore === false) && (buttonLoadMore === true) && (dataFilter.list.length > limit)" class="load_more_filter" @click="loadMore = true">{{ $t('load_more') }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterBasic',
  // eslint-disable-next-line vue/require-prop-types
  props: ['dataFilter', 'buttonLoadMore', 'limit', 'textValue', 'textName', 'keyFilter', 'updateState', 'hiddenCollapse'],
  data() {
    return {
      listData: [],
      listValue: [],
      showListFilter: true,
      loadMore: false,
      itemValue: 'id',
      itemName: 'value'
    }
  },
  watch: {
    listValue() {
      this.changeListValue()
    },
    'updateState.status'() {
      const data = []
      this.dataFilter.list.forEach(filter => {
        if (this.updateState.list.includes(String(filter[this.itemValue])) || this.updateState.list.includes(filter[this.itemValue])) {
          data.push(filter[this.itemValue])
        }
      })
      this.listValue = data
    }
  },
  created() {
    if (this.textValue) {
      this.itemValue = this.textValue
    }
    if (this.textName) {
      this.itemName = this.textName
    }
  },
  methods: {
    resetValidate(ref) {
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
    },
    checkShow(index) {
      if (this.buttonLoadMore !== true) return true
      if ((this.loadMore === false) && (index >= this.limit)) return false
      return true
    },
    changeListValue() {
      const list = []
      const listValue = []
      this.dataFilter.list.forEach(data => {
        if (this.listValue.includes(data[this.itemValue])) {
          list.push(data[this.itemName])
          listValue.push(data[this.itemValue])
        }
      })
      this.$emit('change', {
        type: this.keyFilter,
        value: list,
        list: listValue,
        title: this.dataFilter.title
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
