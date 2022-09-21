<template>
  <div>
    <Vue2OrgTree
      label-class-name="orglabel"
      name="test"
      :data="data"
      :pan="pan"
      :zoom="zoom"
      :horizontal="horizontal"
      :collapsable="collapsable"
      :render-content="renderContent"
      @on-expand="onExpand"
      @on-node-click="onNodeClick"
    ></Vue2OrgTree>
  </div>
</template>

<script>
export default {
  name: 'TreeComponent',
  data() {
    return {
      data: {
        id: 0,
        label: '1',
        children: [
          {
            id: 1,
            label: '2',
            children: [
              {
                id: 11,
                label: '生产质量',
                children: [
                  {
                    id: 111,
                    label: '生产事件'
                  }
                ]
              },
              {
                id: 12,
                label: '开发质量',
                children: [
                  {
                    id: 121,
                    label: '项目开发缺陷密度'
                  }
                ]
              },
              {
                id: 13,
                label: '发布质量',
                children: [
                  {
                    id: 131,
                    label: '上线失败率'
                  }
                ]
              },
              {
                id: 14,
                label: '过程质量',
                children: [
                  {
                    id: 141,
                    label: '项目过程符合度'
                  }
                ]
              }
            ]
          }
        ],
        expand: true
      },
      horizontal: false, // 横向
      collapsable: true, // 可折叠
      expandAll: true,
      labelClassName: 'bg-white',
      zoom: true,
      pan: true,
      dependenceForm: {
        originNode: '',
        targetNode: ''
      },
      visible: false,
      deleteDialogVisible: false, // 删除框的boolean
      childVisible: false, // 子弹窗
      deleteNode: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      optionsValue: ''
      // 背景色 labelWidth：节点标签宽度
      // renderContent：如何渲染节点标签
      // labelClassName:节点标签类
      // selectedKey: 所选节点的密钥
      // selectedClassName: 所选节点的className
      // props: 配置属性
      // pan: 移动
      // zoom: 放大
      // click  mouseover mouseout
    }
  },
  methods: {
    renderContent(h, data) {
      console.log(data)
      // const temp = require('~/assets/images/icons/eye.svg')
      // return (<span>
      //   <el-dropdown oncommand={(v) => this.onClick(v, data)}>
      //     <span class='el-dropdown-link'>
      //       {data.label}
      //       <i class='el-icon-arrow-down el-icon--right'></i>
      //     </span>
      //     <el-dropdown-menu
      //       slot='dropdown'
      //     >
      //       <el-dropdown-item command='addChild'>新增子节点</el-dropdown-item>
      //       <el-dropdown-item command='del'>删除</el-dropdown-item>
      //     </el-dropdown-menu>
      //   </el-dropdown>
      // </span>)
      return (
        <img src='_nuxt/assets/images/icons/eye.svg' alt=''/>
      )
    },
    onClick(type, node) {
      console.log(type, node)
      this.$message.info('点击事件')
      if (type === 'del') {
        if (node.children && node.children.length > 0) {
          this.$message.info('当前节点存在子部门，请先删除子节点')
          return false
        }
        // this.deleteDialogVisible = true
        this.$refs.deleteDialaog.changeDialogStatus(true)
        this.deleteNode = node.label
      }
      if (type === 'addChild') {
        this.childVisible = true
        this.$refs.childDialog.changeDialogStatus(true)
      }
      // if (keyObj.key === 'del') {
      //   if (node.children && node.children.length > 0) {
      //     this.$message.info('当前部门存在子部门，请先删除子部门')
      //   } else {
      //     this.$http.get('/rdDept/del', { params: { id: node.value } })
      //       .then(res => {
      //         if (res.success && res.data) {
      //           this.$message.success('删除成功')
      //           this.loadTree()
      //         } else {
      //           this.$message.error(res.errorMessage)
      //         }
      //       })
      //   }
      // } else {
      //   this.$refs.modifyDept.showModal(keyObj.key, node)
      // }
    },
    onExpand(e, data) {
      if ('expand' in data) {
        data.expand = !data.expand
        if (!data.expand && data.children) {
          this.collapse(data.children)
        }
      } else {
        this.$set(data, 'expand', true)
      }
    },
    // 点击选项执行的方法，可以用于跳转到其他链接，注意一定要写协议头
    onNodeClick(e, data) {
      console.log(data)
      if (data.url == null) {
        return false
      } else {
        window.open(data.url)
      }
    },
    collapse(list) {
      const _this = this
      list.forEach(function(child) {
        if (child.expand) {
          child.expand = false
        }
        child.children && _this.collapse(child.children)
      })
    },
    expandChange() {
      this.toggleExpand(this.data, this.expandAll)
    },
    toggleExpand(data, val) {
      const _this = this
      if (Array.isArray(data)) {
        data.forEach(function(item) {
          _this.$set(item, 'expand', val)
          if (item.children) {
            _this.toggleExpand(item.children, val)
          }
        })
      } else {
        this.$set(data, 'expand', val)
        if (data.children) {
          _this.toggleExpand(data.children, val)
        }
      }
    }
  }
}
</script>
<style lang="scss">
.tree-container {
  background-color: #fff;
  width: 1100px;
  overflow: auto;
  height: 100%;

  .addBtn {
    margin-left: 1000px;
  }

  //.el-popover__title {
  //  color: #303133;
  //  font-size: 16px;
  //  line-height: 1;
  //  padding-bottom: 10px;
  //  margin-bottom: 12px;
  //  border-bottom: 1px solid #eee !important;
  //}
  //
  //.dialogStyle {
  //  position: absolute;
  //  top: 200px;
  //  right: 30px;
  //  width: 550px !important;
  //
  //  .el-dialog__body {
  //    padding-bottom: 10px;
  //  }
  //}
  //
  //.dialogChildStyle {
  //  width: 210px !important;
  //
  //  .el-dialog__header {
  //    display: none;
  //    border: none;
  //  }
  //
  //  .el-dialog__footer {
  //    border: none !important;
  //  }
  //
  //  .search-content {
  //    margin-top: 10px;
  //    padding-bottom: 10px;
  //
  //    p {
  //      text-align: center;
  //    }
  //  }
  //}
  //
  //.el-dialog__footer {
  //  text-align: right;
  //}
  //
  //.deleteName {
  //  font-size: 14px;
  //}
  //
  //.deleteWord {
  //  color: gray;
  //  font-size: 14px;
  //}
  //
  //.bg-white {
  //  background-color: #ECF5FF;
  //}
  //
  //.org-tree-node-label .org-tree-node-label-inner {
  //  padding: 10px 15px;
  //  text-align: center;
  //  border-radius: 3px;
  //  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  //  border: 1px solid lightblue;
  //}
  //
  //.el-dropdown-link {
  //  color: #419EFF;
  //}
  //
  //.el-icon--right {
  //  color: #aaa;
  //}
  //
  //.marvel {
  //  font-size: 22px;
  //  color: orange;
  //  margin-right: 10px;
  //  vertical-align: -3px;
  //}
}
</style>
<!--<style lang="css">-->
<!--.org-tree-node-label {-->
<!--  white-space: nowrap;-->
<!--}-->

<!--.bg-white {-->
<!--  background-color: white;-->
<!--}-->

<!--.bg-orange {-->
<!--  background-color: orange;-->
<!--}-->

<!--.bg-gold {-->
<!--  background-color: gold;-->
<!--}-->

<!--.bg-gray {-->
<!--  background-color: gray;-->
<!--}-->

<!--.bg-lightpink {-->
<!--  background-color: lightpink;-->
<!--}-->

<!--.bg-chocolate {-->
<!--  background-color: chocolate;-->
<!--}-->

<!--.bg-tomato {-->
<!--  background-color: tomato;-->
<!--}-->

<!--.org-tree-container {-->
<!--  display: inline-block;-->
<!--  padding: 15px;-->
<!--  background-color: #fff;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--}-->
<!--</style>-->
