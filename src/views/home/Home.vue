<template>
  <div class="wraper">
    <div class="menu" :class="classObject">
      <home-sildebar></home-sildebar>
    </div>
    <div class="main" :class="classContent">
      <div class="header">
        <home-header></home-header>
      </div>
      <div class="content-box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeSildebar from './components/Sidebar'
import bus from '@/utils/common/bus'
export default {
  data () {
    return {
      collapse: false
    }
  },
  components: {
    HomeHeader,
    HomeSildebar
  },
  computed: {
    classObject () {
      let pc = false
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        pc = false
      } else if (/(Android)/i.test(navigator.userAgent)) {
        pc = false
      } else {
        pc = true
      }
      return {
        'content-collapse': this.collapse,
        collapse: this.collapse && !pc
      }
    },
    classContent () {
      let pc = false
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        pc = false
      } else if (/(Android)/i.test(navigator.userAgent)) {
        pc = false
      } else {
        pc = true
      }
      return {
        'content-activity': this.collapse,
        'content-activity-collapse': this.collapse && !pc
      }
    }
  },
  mounted () {
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
  }
}
</script>

<style scoped>
.wraper{
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  flex-direction:row;
}
.menu {
  flex: 0 0 200px;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}
.main {
  height: 100%;
  width: calc(100% - 200px);
}
.header {
  width: 100%;
  z-index: 999;
  background: #2A3658;
  flex: 0 0 88px;
}
.content-collapse {
  flex: 0 0 65px;
}
.content-activity {
  width: calc(100% - 65px);
}
.content-activity-collapse {
  width: 100%;
}
.content-box{
  background: #F5F6FA;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 66px);
}
</style>
