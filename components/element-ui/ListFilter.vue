<!--<template>-->
<!--  <div class="list_filter">-->
<!--    <div v-if="(listFilter.includes('category_search')) || filterAll" class="filter_item_category">-->
<!--      <FilterCategorySearch-->
<!--        :data-filter="{ title: $t('filter.category'), list: (dataFilter.category_search || listData.category_search) }"-->
<!--        :data="(dataFilter.category_search)" :limit="4"-->
<!--        :button-load-more="true" key-filter="category_search"/>-->
<!--    </div>-->
<!--    <div v-if="(listFilter.includes('category')) || filterAll" class="filter_item_category">-->
<!--      <FilterCategory :data-filter="{ title: $t('filter.category'), list: (dataFilter.category || listData.category) }" key-filter="category"/>-->
<!--    </div>-->
<!--    <div v-if="listFilter.includes('price') || filterAll" class="filter_item">-->
<!--      <FilterPrice-->
<!--        :data-filter="{ list: (dataFilter.price || listData.price) }" key-filter="price" :update-state="listSelect.price"-->
<!--        :update-range-state="listSelect.price_range" @change="updateFilter"/>-->
<!--    </div>-->
<!--    <div v-if="(listFilter.includes('branch') || filterAll) && (listData.branch.length > 0)" class="filter_item">-->
<!--      <FilterBasic-->
<!--        :data-filter="{ title: $t('filter.branch'), list: (dataFilter.branch || listData.branch) }" key-filter="branch" :limit="5"-->
<!--        :button-load-more="true" :update-state="listSelect.branch" @change="updateFilter"/>-->
<!--    </div>-->
<!--    <div v-if="listFilter.includes('rating') || filterAll" class="filter_item">-->
<!--      <FilterRating :data-filter="{ title: $t('filter.rating'), list: (dataFilter.rating || listData.rating )}" key-filter="rating" :update-state="listSelect.rating" @change="updateFilter"/>-->
<!--    </div>-->
<!--    <template v-for="filter in listFilterAdvance">-->
<!--      <div :key="filter" class="filter_item">-->
<!--        <FilterBasic-->
<!--          :data-filter="{ title: dataFilterAdvance[filter].name, list: dataFilterAdvance[filter].property_items }" :key-filter="filter"-->
<!--          :update-state="listSelect[filter]" :limit="6" :button-load-more="true" @change="updateFilter"/>-->
<!--      </div>-->
<!--    </template>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { mapState } from 'vuex'-->
<!--import FilterBasic from './filter/FilterBasic'-->
<!--// import FilterCategory from './filter/FilterCategory'-->
<!--// import FilterPrice from './filter/FilterPrice'-->
<!--// import FilterRating from './filter/FilterRating'-->
<!--// import FilterCategorySearch from './filter/FilterCategorySearch'-->
<!--export default {-->
<!--  name: 'ListFilter',-->
<!--  // components: { FilterBasic, FilterCategory, FilterPrice, FilterRating, FilterCategorySearch },-->
<!--  // eslint-disable-next-line vue/require-prop-types-->
<!--  props: ['listFilter', 'dataFilter', 'listFilterAdvance', 'dataFilterAdvance', 'filterAll', 'asyncData', 'dataFilterBase', 'checkLoad'],-->
<!--  data() {-->
<!--    return {-->
<!--      listData: {-->
<!--        category: {-->
<!--          id: '',-->
<!--          slug: 'sofa',-->
<!--          title: 'Sofa',-->
<!--          image: '',-->
<!--          link: '/category/phong-khach/sofa',-->
<!--          child: [-->
<!--          ],-->
<!--          parent: {-->
<!--            id: '',-->
<!--            step: 1,-->
<!--            slug: 'phong-khach',-->
<!--            link: '/category/phong-khach',-->
<!--            title: 'Phòng khách',-->
<!--            image: ''-->
<!--          }-->
<!--        },-->
<!--        category_search: [],-->
<!--        price: [-->
<!--          {-->
<!--            id: 1,-->
<!--            value: 'Dưới 2.000.000 VND'-->
<!--          },-->
<!--          {-->
<!--            id: 2,-->
<!--            value: '2.000.000 - 5.000.000 VND'-->
<!--          },-->
<!--          {-->
<!--            id: 3,-->
<!--            value: '5.000.000 - 10.000.000 VND'-->
<!--          },-->
<!--          {-->
<!--            id: 4,-->
<!--            value: 'Trên 10.000.000 VND'-->
<!--          }-->
<!--        ],-->
<!--        branch: [-->
<!--          {-->
<!--            id: 1,-->
<!--            value: 'Baya'-->
<!--          },-->
<!--          {-->
<!--            id: 2,-->
<!--            value: 'Nhà xinh'-->
<!--          },-->
<!--          {-->
<!--            id: 3,-->
<!--            value: 'Home office'-->
<!--          },-->
<!--          {-->
<!--            id: 4,-->
<!--            value: 'Deco Việt'-->
<!--          },-->
<!--          {-->
<!--            id: 5,-->
<!--            value: 'Phố xinh'-->
<!--          },-->
<!--          {-->
<!--            id: 6,-->
<!--            value: 'Baya'-->
<!--          },-->
<!--          {-->
<!--            id: 7,-->
<!--            value: 'Baya'-->
<!--          },-->
<!--          {-->
<!--            id: 8,-->
<!--            value: 'Baya'-->
<!--          }-->
<!--        ],-->
<!--        rating: [6, 5, 4, 3, 2],-->
<!--        promo: [-->
<!--          {-->
<!--            id: 1,-->
<!--            value: 'Đang giảm giá'-->
<!--          },-->
<!--          {-->
<!--            id: 2,-->
<!--            value: 'Miễn phí vận chuyển'-->
<!--          }-->
<!--        ],-->
<!--        color: [-->
<!--          {-->
<!--            id: 1,-->
<!--            value: 'Màu nâu'-->
<!--          },-->
<!--          {-->
<!--            id: 2,-->
<!--            value: 'Màu xám'-->
<!--          },-->
<!--          {-->
<!--            id: 3,-->
<!--            value: 'Màu be'-->
<!--          },-->
<!--          {-->
<!--            id: 4,-->
<!--            value: 'Màu xanh dương'-->
<!--          },-->
<!--          {-->
<!--            id: 5,-->
<!--            value: 'Màu đen'-->
<!--          },-->
<!--          {-->
<!--            id: 6,-->
<!--            value: 'Màu trắng'-->
<!--          },-->
<!--          {-->
<!--            id: 7,-->
<!--            value: 'Màu đỏ'-->
<!--          },-->
<!--          {-->
<!--            id: 8,-->
<!--            value: 'Màu xanh lá'-->
<!--          },-->
<!--          {-->
<!--            id: 9,-->
<!--            value: 'Màu vàng'-->
<!--          }-->
<!--        ],-->
<!--        design: [-->
<!--          {-->
<!--            id: 1,-->
<!--            value: 'Tiêu chuẩn'-->
<!--          },-->
<!--          {-->
<!--            id: 2,-->
<!--            value: 'Giường sofa'-->
<!--          },-->
<!--          {-->
<!--            id: 3,-->
<!--            value: 'Ngã lưng'-->
<!--          },-->
<!--          {-->
<!--            id: 4,-->
<!--            value: 'Cong'-->
<!--          },-->
<!--          {-->
<!--            id: 5,-->
<!--            value: 'Mô-đun'-->
<!--          }-->
<!--        ],-->
<!--        material: [-->
<!--          {-->
<!--            id: 1,-->
<!--            value: 'Da thật'-->
<!--          },-->
<!--          {-->
<!--            id: 2,-->
<!--            value: 'Da giả'-->
<!--          },-->
<!--          {-->
<!--            id: 3,-->
<!--            value: 'Kết hợp (mặt trước thật, mặt sau giả)'-->
<!--          }-->
<!--        ],-->
<!--        softness: [-->
<!--          {-->
<!--            id: 1,-->
<!--            value: 'Mềm'-->
<!--          },-->
<!--          {-->
<!--            id: 2,-->
<!--            value: 'Trung bình'-->
<!--          },-->
<!--          {-->
<!--            id: 3,-->
<!--            value: 'Chắc chắn'-->
<!--          }-->
<!--        ],-->
<!--        capacity: [-->
<!--          {-->
<!--            id: 1,-->
<!--            value: '1 chỗ'-->
<!--          },-->
<!--          {-->
<!--            id: 2,-->
<!--            value: '2 chỗ'-->
<!--          },-->
<!--          {-->
<!--            id: 3,-->
<!--            value: '3 chỗ'-->
<!--          },-->
<!--          {-->
<!--            id: 4,-->
<!--            value: '4 chỗ'-->
<!--          },-->
<!--          {-->
<!--            id: 5,-->
<!--            value: '5 chỗ'-->
<!--          },-->
<!--          {-->
<!--            id: 6,-->
<!--            value: '6 chỗ'-->
<!--          }-->
<!--        ],-->
<!--        product_design: [-->
<!--          {-->
<!--            id: 1,-->
<!--            value: 'Sang trọng'-->
<!--          },-->
<!--          {-->
<!--            id: 2,-->
<!--            value: 'Hiện đại'-->
<!--          },-->
<!--          {-->
<!--            id: 3,-->
<!--            value: 'Truyền thống'-->
<!--          },-->
<!--          {-->
<!--            id: 4,-->
<!--            value: 'Tối tân'-->
<!--          },-->
<!--          {-->
<!--            id: 5,-->
<!--            value: 'Hiện đại giữa thế kỷ'-->
<!--          },-->
<!--          {-->
<!--            id: 6,-->
<!--            value: 'Công nghiệp'-->
<!--          },-->
<!--          {-->
<!--            id: 7,-->
<!--            value: 'Khách sạn'-->
<!--          }-->
<!--        ],-->
<!--        product_detail: [-->
<!--          {-->
<!--            id: 1,-->
<!--            value: 'Có'-->
<!--          },-->
<!--          {-->
<!--            id: 2,-->
<!--            value: 'Không'-->
<!--          }-->
<!--        ],-->
<!--        safe_material: [-->
<!--          {-->
<!--            id: 1,-->
<!--            value: 'Ít hoá chất'-->
<!--          },-->
<!--          {-->
<!--            id: 2,-->
<!--            value: 'Tái chế'-->
<!--          },-->
<!--          {-->
<!--            id: 3,-->
<!--            value: 'Hữu cơ'-->
<!--          },-->
<!--          {-->
<!--            id: 4,-->
<!--            value: 'Gỗ'-->
<!--          },-->
<!--          {-->
<!--            id: 5,-->
<!--            value: 'Chứng nhận greenguard'-->
<!--          }-->
<!--        ]-->
<!--      },-->
<!--      listSelect: {-->
<!--        category: {-->
<!--          status: true,-->
<!--          value: []-->
<!--        },-->
<!--        price: {-->
<!--          status: true,-->
<!--          value: []-->
<!--        },-->
<!--        price_range: {-->
<!--          status: true,-->
<!--          value: []-->
<!--        },-->
<!--        branch: {-->
<!--          status: true,-->
<!--          value: []-->
<!--        },-->
<!--        rating: {-->
<!--          status: true,-->
<!--          value: []-->
<!--        },-->
<!--        promo: {-->
<!--          status: true,-->
<!--          value: []-->
<!--        },-->
<!--        color: {-->
<!--          status: true,-->
<!--          value: []-->
<!--        },-->
<!--        design: {-->
<!--          status: true,-->
<!--          value: []-->
<!--        },-->
<!--        material: {-->
<!--          status: true,-->
<!--          value: []-->
<!--        },-->
<!--        softness: {-->
<!--          status: true,-->
<!--          value: []-->
<!--        },-->
<!--        capacity: {-->
<!--          status: true,-->
<!--          value: []-->
<!--        },-->
<!--        product_design: {-->
<!--          status: true,-->
<!--          value: []-->
<!--        },-->
<!--        product_detail: {-->
<!--          status: true,-->
<!--          value: []-->
<!--        },-->
<!--        safe_material: {-->
<!--          status: true,-->
<!--          value: []-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    ...mapState('filter', {-->
<!--      removeFilter: state => state.removeFilter,-->
<!--      addFilter: state => state.addFilter,-->
<!--      clearAllFilter: state => state.clearAllFilter-->
<!--    })-->
<!--  },-->
<!--  watch: {-->
<!--    removeFilter(val) {-->
<!--      const data = this.listSelect[val.type].list-->
<!--      const index = data.indexOf(val.value)-->
<!--      if (index !== -1) {-->
<!--        data.splice(index, 1)-->
<!--      }-->
<!--      if (index.length !== data.length) {-->
<!--        this.listSelect[val.type].list = data-->
<!--        this.listSelect[val.type].status = !this.listSelect[val.type].status-->
<!--      }-->
<!--      if (val.type === 'price_range') {-->
<!--        this.updateFilter({-->
<!--          type: 'price_range',-->
<!--          value: [],-->
<!--          list: [],-->
<!--          title: this.$t('filter.price')-->
<!--        })-->
<!--      }-->
<!--    },-->
<!--    addFilter: {-->
<!--      handler(val) {-->
<!--        const query = this.$route.query-->
<!--        for (const [key] of Object.entries(query)) {-->
<!--          if (query[key] && (!['search', 'order_by', 'page'].includes(key))) {-->
<!--            if (this.listSelect[key] !== undefined) {-->
<!--              this.listSelect[key].list = query[key].split(',')-->
<!--              this.listSelect[key].status = !this.listSelect[key].status-->
<!--            } else {-->
<!--              this.listSelect[key] = {-->
<!--                list: query[key].split(','),-->
<!--                status: false-->
<!--              }-->
<!--            }-->
<!--          }-->
<!--        }-->
<!--      },-->
<!--      deep: true-->
<!--    },-->
<!--    clearAllFilter() {-->
<!--      for (const [key] of Object.entries(this.listSelect)) {-->
<!--        if (this.listSelect[key].value !== undefined) {-->
<!--          if (this.listSelect[key].value.length > 0) {-->
<!--            this.listSelect[key].list = []-->
<!--            this.listSelect[key].status = !this.listSelect[key].status-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    dataFilter: {-->
<!--      handler(val) {-->
<!--        const data = this.listData-->
<!--        for (const [key, value] of Object.entries(val)) {-->
<!--          data[key] = value-->
<!--        }-->
<!--        this.listData = data-->
<!--      },-->
<!--      deep: true-->
<!--    },-->
<!--    checkLoad() {-->
<!--      const data = this.listData-->
<!--      for (const [key, value] of Object.entries(this.dataFilter)) {-->
<!--        data[key] = value-->
<!--      }-->
<!--      this.listData = data-->
<!--    },-->
<!--    listFilterAdvance: {-->
<!--      handler() {-->
<!--        this.listFilterAdvance.forEach(filter => {-->
<!--          this.listSelect[filter] = {-->
<!--            status: true,-->
<!--            value: []-->
<!--          }-->
<!--        })-->
<!--      },-->
<!--      deep: true-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    const data = this.listData-->
<!--    for (const [key, value] of Object.entries(this.dataFilter)) {-->
<!--      data[key] = value-->
<!--    }-->
<!--    this.listData = data-->
<!--    this.listFilterAdvance.forEach(filter => {-->
<!--      this.listSelect[filter] = {-->
<!--        status: true,-->
<!--        value: []-->
<!--      }-->
<!--    })-->
<!--  },-->
<!--  methods: {-->
<!--    resetValidate(ref) {-->
<!--      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()-->
<!--      this.accountForm.errors[ref] = ''-->
<!--    },-->
<!--    updateFilter(dataFilter) {-->
<!--      if (this.listSelect[dataFilter.type] === undefined) {-->
<!--        dataFilter.status = true-->
<!--      } else {-->
<!--        dataFilter.status = this.listSelect[dataFilter.type].status-->
<!--      }-->
<!--      this.listSelect[dataFilter.type] = dataFilter-->

<!--      this.$emit('change', dataFilter)-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped lang="scss">-->
<!--</style>-->
