<!--  -->
<template>
  <div class="search">
    <div class="type clearfix">
      <ul>
        <li :class="searchType === 'web' ? 'active' : ''" @click="changeSearchType('web')">网页</li>
        <li :class="searchType === 'img' ? 'active' : ''" @click="changeSearchType('img')">图片</li>
        <li :class="searchType === 'new' ? 'active' : ''" @click="changeSearchType('new')">新闻</li>
        <li :class="searchType === 'vedio' ? 'active' : ''" @click="changeSearchType('vedio')">视频</li>
        <li :class="searchType === 'map' ? 'active' : ''" @click="changeSearchType('map')">地图</li>
      </ul>
    </div>
    <div class="input">
      <!-- <div class="search_type">
        
      </div> -->
      <input type="text" @keyup.enter="search" id="search" v-model="searchValue" placeholder="直接输入连接可以直接访问，也可以输入内容进行网页搜索">

      <svg t="1614439363567" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2857" width="20" height="20">
        <path d="M426.666667 170.666667a256 256 0 1 0 0 512 256 256 0 0 0 0-512z m-341.333334 256a341.333333 341.333333 0 1 1 610.986667 209.322666l229.845333 229.845334a42.666667 42.666667 0 0 1-60.330666 60.330666l-229.845334-229.845333A341.333333 341.333333 0 0 1 85.333333 426.666667z" fill="#515151" p-id="2858"></path>
      </svg>

    </div>

    <!-- <el-dialog
      title="搜索引擎"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog> -->

  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref, } from 'vue'
export default defineComponent({
  name: "Search",
  setup() {
    
    const searchType = ref("web");

    const changeSearchType = (e: string)=>{
      searchType.value = e;
    }

    onMounted(()=>{
      const input = document.getElementById("search");
      if(input !== null){
        input.focus();
      }
    });

    const searchValue = ref("");

    const search = ()=>{
      switch(searchType.value){
        case "web":
          window.open(`https://www.baidu.com/s?wd=${searchValue.value}`)
          break;
        case "img":
          window.open(`https://image.baidu.com/search/index?tn=baiduimage&ps=1&ct=201326592&lm=-1&cl=2&nc=1&ie=utf-8&word=${searchValue.value}`);
          break;
        case "new":
          window.open(`https://www.baidu.com/s?rtt=1&bsst=1&cl=2&tn=news&rsv_dl=ns_pc&word=${searchValue.value}`);
          break;
        case "vedio":
          window.open(`https://haokan.baidu.com/videoui/page/search?query=${searchValue.value}`);
          break;
        case "map":
          window.open(`https://map.baidu.com/search/${searchValue.value}?querytype=s&da_src=shareurl&wd=${searchValue.value}`);
          break;
      }
    }

    return {
      searchType, searchValue, 
      changeSearchType, 
      search, 
    }

  }
});
</script>
<style lang="scss" scoped>
  .search{
    width: 100%;
    height: 130px;
    padding: 0 12px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    flex-wrap: wrap;
    .type{
      width: 100%;
      font-size: 18px;
      color: #FFF;
      text-shadow: 1px 1px 2px #333333;
      font-family: albb;
      margin-bottom: 8px;
      height: 31px;
      // padding-left: 60px;
      padding-left: 24px;
      position: absolute;
      bottom: 80px;
      li{
        float: left;
        margin-right: 24px;
        padding: 3px 0;
        cursor: pointer;
        &:hover, 
        &.active{
          border-bottom: 2px solid #34ace0;
        }
      }
    }
    .input{
      width: 100%;
      position: relative;
      input{
        font-family: albb;
        font-size: 18px;
        color: #3c3c3c;
        width: 100%;
        border: 2px solid #6c6c6c;
        border-radius: 100px;
        background-color: #f5f6f7;
        // padding: 12px 24px 12px 70px;
        padding: 12px 24px;
      }
      svg{
        position: absolute;
        right: 17px;
        top: 16px;
      }
      .search_type{
        position: absolute;
        width: 60px;
        height: 100%;
        top: 0;
        left: 0;
        border: 2px solid #6c6c6c;
        background-color: #f5f6f7;
        border-top-left-radius: 100px;
        border-bottom-left-radius: 100px;
      }
    }
  }
</style>