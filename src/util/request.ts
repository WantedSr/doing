import axios from "axios";
import { ElMessageBox, ElMessage } from 'element-plus'
// import store from '@/store'

const instance = axios.create({
  timeout: 5000,
  // baseURL: "",
});

instance.interceptors.request.use(
  config=>{
    // console.log(config);
    return config;
  },
  error=>{
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
);

instance.interceptors.response.use(
  res=>{
    // console.log(res);
    if(res.status !== 200){
      ElMessage({
        message: "请求出现亿点点小问题，请稍后再试",
        type: 'error',
        duration: 5 * 1000
      })
      if (res.status === 401 || res.status === 403 || res.status === 405) {
        // to re-login
        ElMessageBox.confirm('获取Bing每日壁纸出现了点问题，请刷新重试！', {
          confirmButtonText: '刷新',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          location.reload();
        })
      }
      return Promise.reject(new Error(res.statusText || "Error"));
    }else{
      return res;
    }
  },
  error=>{
    console.log('err' + error) // for debug
    ElMessage({
      message: "请求出现亿点点小问题，请稍后再试",
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error);
  }
)

export default instance;
