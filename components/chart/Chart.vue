<template>
  <div class="chart-container">
    <div style="display: flex;">
      <el-button @click="controlScale('bigger')">+</el-button>
      <el-button @click="controlScale('smaller')">-</el-button>
      <el-button @click="controlScale('restore')">1:1</el-button>
    </div>
    <vue-tree
      ref="scaleTree"
      style="width: 100%; height: 1000px"
      :dataset="data"
      :config="treeConfig"
      link-style="straight"
    >
      <template v-slot:node="{ node, collapsed }">
        <div class="rich-media-node" :style="{ border: collapsed ? '2px solid grey' : '' }">
          <p class="name">{{ node.name }}</p>
          <div class="node-line">
            <img :src="require('~/assets/images/icons/tree/mail.svg')">
            <p class="email">{{ node.email }}</p>
          </div>
          <div class="node-line">
            <img :src="require('~/assets/images/icons/tree/building.svg')">
            <p class="role_name">{{ node.role_name }}</p>
          </div>
          <div class="node-line">
            <img :src="require('~/assets/images/icons/tree/bag.svg')">
            <p class="package_name">Gói đang dùng: {{ node.package_name }}</p>
          </div>
          <div class="node-line">
            <img :src="require('~/assets/images/icons/tree/coin.svg')">
            <p class="total_money">Tổng gói: ${{ node.total_money_text }}</p>
          </div>
        </div>
      </template>
    </vue-tree>
  </div>
</template>

<script>
export default {
  name: 'ChartComponent',
  props: ['data'],
  data() {
    return {
      treeConfig: { nodeWidth: 400, nodeHeight: 184, levelHeight: 300 }
    }
  },
  methods: {
    controlScale(command) {
      switch (command) {
        case 'bigger':
          this.$refs.scaleTree.zoomIn()
          break
        case 'smaller':
          this.$refs.scaleTree.zoomOut()
          break
        case 'restore':
          this.$refs.scaleTree.restoreScale()
          break
      }
    }
  }
}
</script>

<style lang="scss">
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .tree-container {
    width: 100%;
    min-height: 1000px;
    .link {
      stroke: #FAAD14 !important;
    }
  }
}
.node-slot {
  .rich-media-node {
    background-color: #042f47 !important;
    height: 184px;
    padding-left: 14px;
    padding-top: 16px;
    padding-right: 14px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    color: white;
    border: 1px solid #FAAD14;
    border-radius: 4px;
    font-family: 'Montserrat';
    .name {
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      padding-bottom: 12px;
    }
    .node-line {
      position: relative;
      margin-bottom: 12px;
      padding-left: 34px;
      img {
        position: absolute;
        width: 24px;
        height: 24px;
        left: 0;
        top: -4px;
      }
    }
  }
}
</style>
