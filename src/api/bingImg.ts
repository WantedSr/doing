import request from "../util/request";
// import ajax from "../util/ajax";

// 使用 axios 的请求，但因为不支持跨端所以先搁着了
export default async function bingTodayImg(idx=0, n=1){
  return await request.get("https://cn.bing.com/HPImageArchive.aspx",{
    // baseURL: "/bingImg",
    params:{
      format: "js",
      idx: idx,
      n: n,
      mkt: "zh-CN",
    },
  })
}

