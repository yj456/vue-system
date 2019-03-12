<template>
  <div class="header-contanier">
    <el-dropdown @command="handleCommand">
      <img class="toux" src="../../../assets/img/tox.jpg"/>
      <el-dropdown-menu class="header-dropdown" slot="dropdown">
        <el-dropdown-item command="helpGuide">帮助指南</el-dropdown-item>
        <el-dropdown-item command="personalCenter">个人中心</el-dropdown-item>
        <el-dropdown-item command="exit">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    handleCommand (command) {
      console.log(command)
      let comm = command
      if (comm === 'helpGuide') {
        this.$message('click on item ' + command)
      } else if (comm === 'personalCenter') {
        this.$message('click on item ' + command)
      } else if (comm === 'exit') {
        window.sessionStorage.removeItem('user')
        this.$router.push({
          path: '/login'
        })
      }
    }
  }
}
</script>

<style scoped>
.header-contanier {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 66px;
  font-size: 16px;
  box-shadow: 0 1px 4px 0 rgba(0,21,41,0.12);
  padding-right: 32px;
  text-align: right;
}
.toux{
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-top: 17px;
}
</style>
