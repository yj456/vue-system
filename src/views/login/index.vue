<template>
  <div class="login-contanier">
    <el-form ref="loginForm" :model="loginForm" :rules="rules"  class="login-form" label-width="60px">
      <h3 class="form-title">系统登录</h3>
      <el-form-item label="用户名" prop="name">
        <el-input class="form-input" v-model="loginForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input class="form-input" v-model="loginForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button @click="onSubmit">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        name: 'admin',
        password: 111111
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      let that = this
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let user = {
            username: this.loginForm.username,
            password: this.loginForm.password
          }
          window.sessionStorage.setItem('user', JSON.stringify(user))
          that.$router.push({path: '/home'})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login-contanier {
  width: 100%;
  height: 100%;
  background: rgb(50, 64, 87);
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-title{
  font-size: 16px;
  color: #ffffff;
  line-height: 32px;
  text-align: center;
  margin-bottom: 16px;
}
</style>
