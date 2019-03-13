<template>
  <div class="sidebar">
    <div class="logo-left" @click="collapseChage">窝的中台</div>
    <el-scrollbar class="sidebar-scrllbar">
      <el-menu
        :collapse-transition="false"
        class="sidebar-el-menu"
        :default-active="onRoutes"
        :collapse="isCollapse"
        unique-opened
        :router="true"
      >
        <template v-for="item in items">
          <template v-if="item.visible">
            <template v-if="item.subs.length">
              <el-submenu :index="item.index" :key="item.index">
                <template slot="title">
                  <i v-if="!collapse" :class="item.icon" class="iconfont iconSize"></i>
                  <i v-if="collapse"  :class="item.icon" class="iconfont iconSize" style="margin-left:10px"></i>
                  <span class="menu-title" slot="title">{{ item.title }}</span>
                </template>
                <el-menu-item-group >
                  <el-menu-item
                    v-for="(subItem,i) in item.subs"
                    v-show="subItem.visible"
                    :key="i"
                    :index="subItem.index"
                  >{{ subItem.title }}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item
                v-if="isDashBoard === 'mastercontrol'"
                :index="item.index"
                :key="item.index"
                class="no-sub-menu"
              >
                <i v-if="collapse" :class="item.icon"></i>
                <i v-if="!collapse" :class="item.icon"></i>
                <span class="menu-title" slot="title">{{ item.title }}</span>
              </el-menu-item>
              <el-menu-item v-else :index="item.index" :key="item.index" class="no-sub-menu">
                <i v-if="collapse" :class="item.icon"></i>
                <i v-if="!collapse" :class="item.icon"></i>
                <span class="menu-title" slot="title">{{ item.title }}</span>
              </el-menu-item>
            </template>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import bus from '@/utils/common/bus'
export default {
  data () {
    return {
      isCollapse: false,
      collapse: false,
      items: [
        {
          id: 'navbar_echarts',
          icon: 'el-icon-picture',
          active: '',
          index: 'echarts',
          title: 'ECharts图',
          visible: true,
          subs: []
        },
        {
          id: 'navbar_table',
          icon: 'el-icon-star-on',
          active: '',
          index: 'table',
          title: '列表',
          visible: true,
          subs: []
        }
      ]
    }
  },
  computed: {
    onRoutes (e) {
      console.log(e)
      return ''
    },
    isDashBoard () {
      return this.$route.path.replace('/', '')
    }

  },
  methods: {
    // 侧边栏折叠
    collapseChage () {
      this.collapse = !this.collapse
      bus.$emit('collapse', this.collapse)
    }
  },
  mounted () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.isCollapse = msg
    })
  }
}
</script>

<style scoped>
.sidebar {
  font-weight: lighter;
  letter-spacing: 1px;
  display: block;
  height: 100%;
  background: #001528;
  overflow: hidden;
}
.logo-left{
  height: 64px;
  background: #002140;
  box-shadow: 0 0 1px 0 #A9AEB6;
  font-size: 20px;
  color: #FFFFFF;
  line-height: 64px;
  text-align: center;
}
.sidebar-scrllbar{
  height: calc(100% - 64px);
}
.sidebar-el-menu{
  background: #001529;
}
.sidebar-scrllbar{
  height: calc(100% - 64px);
}

.sidebar {
  font-weight: lighter;
  letter-spacing: 1px;
  display: block;
  height: 100%;
  background: #001528;
  overflow: hidden;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 100%;
}

.menu-title {
  margin-left: 16px;
  font-size: 14px;
}
</style>
