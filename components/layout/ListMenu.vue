<template>
  <div class="menu-header">
    <div class="menu-header-list">
      <div v-if="listMenu.length" class="list-menu-header" @mouseover="showMenu" @mouseleave="hideMenu">
        <VueSlickCarousel v-bind="slideSetting">
          <div v-for="(menu, index) in listMenu" :key="index" class="list_menu_child">
            <div class="div-menu-slick" @mouseover="showActive = index">
              <div :class="['menu-slick', {active: menu.active}]" >
                <router-link :to="menu.link">
                  <span>{{ menu.name }}</span>
                </router-link>
              </div>
            </div>
          </div>
        </VueSlickCarousel>
        <div v-for="(menu, index) in listMenu" :key="index">
          <div v-if="(index === showActive) && (menu.children.length > 0)" class="list-child-menu">
            <div v-for="(child, index_child) in menu.children" :key="index_child" class="list_child_first">
              <router-link :to="child.link">
                <span class="child_first">{{ child.name }}</span>
              </router-link>
              <div class="list_child_second">
                <router-link v-for="(second, index_second) in child.children" :key="index_second" :to="second.link">
                  <span class="child_second">{{ second.name }}</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-default-content"></div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'ListMenu',
  components: { VueSlickCarousel },
  // eslint-disable-next-line vue/require-prop-types
  props: ['listMenu'],
  data() {
    return {
      slideSetting: {
        'dots': false,
        'focusOnSelect': false,
        'infinite': true,
        'initialSlide': 2,
        'speed': 500,
        'slidesToShow': 6,
        'slidesToScroll': 1,
        'swipeToSlide': true
      },
      showModal: false,
      showActive: null
    }
  },

  methods: {
    showMenu() {
      this.showModal = true
    },
    hideMenu() {
      this.showModal = false
      this.showActive = null
    },
    changeToLink(link) {
      this.$router.push(link)
    }
  }
}
</script>
