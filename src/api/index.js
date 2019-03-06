// 引入axios
import axios from 'axios'
import qs from 'qs'
import router from '../router'

let cancel = {}
let promiseArr = {}
const CancelToken = axios.CancelToken
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 发起请求时，取消掉当前正在进行的相同请求
    if (config.headers) {
      if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消')
        promiseArr[config.url] = cancel
      } else {
        promiseArr[config.url] = cancel
      }
    }

    let token = window.localStorage.getItem('token')

    // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
    if (config.method.toLocaleLowerCase() === 'post' ||
        config.method.toLocaleLowerCase() === 'put' ||
        config.method.toLocaleLowerCase() === 'delete') {
      config.data.token = token
      config.data = qs.stringify(config.data)
    }
    // config.headers = {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    // }
    return config
  }, error => {
    // 请求错误时做些事(接口错误、超时等)
    // Tip: 4
    // 关闭loadding
    console.log('request:', error)

    //  1.判断请求超时
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案')
      // return service.request(originalRequest);//例如再重复请求一次
    }
    //  2.需要重定向到错误页面
    const errorInfo = error.response
    console.log(errorInfo)
    if (errorInfo) {
      // error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
      const errorStatus = errorInfo.status // 404 403 500 ... 等
      router.push({
        path: `/error/${errorStatus}`
      })
    }
    return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
  })

// 响应拦截器即异常处理
axios.interceptors.response.use(
  response => {
    console.log(response)
    return response
  }, err => {
    console.log(err)
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break
        case 401:
          err.message = '未授权，请重新登录'
          break
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = '请求错误,未找到该资源'
          break
        case 405:
          err.message = '请求方法未允许'
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器端出错'
          break
        case 501:
          err.message = '网络未实现'
          break
        case 502:
          err.message = '网络错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网络超时'
          break
        case 505:
          err.message = 'http版本不支持该请求'
          break
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = '连接到服务器失败'
    }
    return Promise.resolve(err.response)
  })

axios.defaults.baseURL = '/api' // window.location.origin  '/api'
// axios.defaults.crossDomain = true;
// 让ajax携带cookie
// axios.defaults.withCredentials = true;
// 设置默认请求头
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
}
axios.defaults.timeout = 1000000

export default {
  // get请求
  get (api, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: api.url,
        params: param,
        withCredentials: true,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      })
    })
  },
  // post请求
  post (api, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: api.url,
        data: param,
        withCredentials: true,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      })
    })
  },

  // 上传图片请求
  upload (api, param) {
    return new Promise((resolve, reject) => {
      axios({
        upload: 'upload',
        method: 'post',
        url: api.url,
        headers: {
          'Content-type': 'multipart/form-data'
        },
        data: param,
        withCredentials: true,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      })
    })
  },

  // 请求二维码的请求
  request (api, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: api.url,
        data: param,
        responseType: 'arraybuffer',
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      })
    })
  },

  // 导出Excel
  educe (api, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: api.url,
        data: param,
        responseType: 'blob'
      }).then(res => {
        console.log(res)
        resolve(res)
      })
    })
  }

}
