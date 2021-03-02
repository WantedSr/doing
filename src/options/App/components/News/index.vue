<!--  -->
<template>
  <div class="news">
    <Base-head>
      <template v-slot:title>
        <div>
          掘金好文
        </div>
      </template>
      <template v-slot:subtitle>
        <div>
          <el-dropdown trigger="click" size="small" @command="changeArticle">
            <span class="el-dropdown-link">
              {{articleTypes.filter(item=>item.value === articleType)[0].title}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in articleTypes" :key="item.value" :icon="'el-icon-'+item.icon" :command="item.value">{{item.title}}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
    </Base-head>
    <div class="newlist box" v-loading="loading" v-infinite-scroll="load" :style="{'height': (clientHeight - 32 - (12*3) - 42 - 130) + 'px','min-height': '458px'}">
      <ul v-if="newList !== null && newList.length > 0">

        <New-item class="topShow" v-for="newitem in newList" :key="newitem.id" :newitem="newitem"/>

        <li v-show="infiniteLoad">
          <svg t="1614168105420" class="icon loading" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3278" data-spm-anchor-id="a313x.7781069.0.i14" width="32" height="32">
            <path d="M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m0 128a298.666667 298.666667 0 1 0 0 597.333334 298.666667 298.666667 0 0 0 0-597.333334z" fill="#000000" fill-opacity=".05" p-id="3279" data-spm-anchor-id="a313x.7781069.0.i16" class=""></path>
            <path d="M813.696 813.696c166.613333-166.613333 166.613333-436.778667 0-603.392-166.613333-166.613333-436.778667-166.613333-603.392 0A64 64 0 0 0 300.8 300.8a298.666667 298.666667 0 1 1 422.4 422.4 64 64 0 0 0 90.496 90.496z" fill="#0984E3" p-id="3280" data-spm-anchor-id="a313x.7781069.0.i15" class=""></path>
          </svg>
        </li>

      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import "../../../../interfece/JuejinArticle";
import getJuejinData from "../../../../api/news";

import { defineComponent, onMounted, ref, } from 'vue'
import { ElMessage } from 'element-plus';

import BaseHead from "../Header/index.vue";
import NewItem from "./newItem.vue";
export default defineComponent({
  name: "News",
  components:{
    BaseHead,
    NewItem, 
  },
  setup() {
    const articleType = ref("heat");
    const articleTypes = [
      {
        title: "热点",
        value: "heat",
        icon: "message-solid"
      },
      {
        title: "最新",
        value: "time",
        icon: "star-on",
      }
    ];

    let offset = 0;
    const newList = ref<JuejinArticle[]>([]);

    const clientHeight = ref(document.documentElement.clientHeight || document.body.clientHeight);
    
    window.addEventListener("resize",()=>{
      clientHeight.value = document.documentElement.clientHeight || document.body.clientHeight;
    });
    
    const loading = ref(true);
    const infiniteLoad = ref(false);

    onMounted(()=>{
      getJuejinData()
      .then(res=>{
        loading.value = false;
        if(res.data.code !== 200){
          ElMessage.warning({
            message: '请求文章出现了些问题，请刷新重试！',
            type: 'warning'
          });
        }else{
          newList.value = res.data.data;
        }
      })
      .catch(err=>{
        loading.value = false;
        console.log(err);
      })
    })


    const load = ()=>{
      if(!loading.value){
        infiniteLoad.value = true;
        offset += 30;
        getJuejinData(30, offset, "frontend", articleType.value)
        .then(res=>{
          // console.log(res);
          infiniteLoad.value = false;
          if(res.data.code !== 200){
            ElMessage.warning({
              message: '请求文章出现了些问题，请刷新重试！',
              type: 'warning'
            });
          }else{
            if(newList.value === null){
              newList.value = res.data.data;
            }else{
              res.data.data.forEach((elem: JuejinArticle) => {
                newList.value.push(elem);
              });
            }
          }
        })
        .catch(err=>{
          infiniteLoad.value = false;
          console.log(err);
        })
      }
    }

    
    const changeArticle = (c: string)=>{
      articleType.value = c;
      loading.value = true;
      offset = 0;
      getJuejinData(30, offset, "frontend", articleType.value)
      .then(res=>{
        // console.log(res);
        loading.value = false;
        if(res.data.code !== 200){
          ElMessage.warning({
            message: '请求文章出现了些问题，请刷新重试！',
            type: 'warning'
          });
        }else{
          newList.value = res.data.data;
        }
      })
      .catch(err=>{
        loading.value = false;
        console.log(err);
      })
    };

    return {
      loading, infiniteLoad, articleType, 
      newList, clientHeight, articleTypes, 
      load, changeArticle, 
    }

  }
});
</script>
<style lang="scss" scoped>
  .news{
    width: 100%;
    
    .newlist{
      overflow-y: scroll;
      overflow-x: hidden;
      padding-bottom: 30px;
      box-shadow: 0 8px 8px rgba(88,88,88,.2);

      li{
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        .loading{
          animation: rotate 1s linear infinite;
        }
        @keyframes rotate {
          0%{
            transform: rotate(0deg);
          }
          100%{
            transform: rotate(360deg);
          }
        }
      }
      &:hover{
        /* 滚动的条条 */
        &::-webkit-scrollbar-thumb{
          background: #aaa;
        }
      }

      /* 整个滚动条 */
      &::-webkit-scrollbar{    
        width: 6px;
        border-radius: 50px;
      }
      /* 滚动条的上下按钮 */
      &::-webkit-scrollbar-button{
        display: none;
      }
      /* 滚动的条条 */
      &::-webkit-scrollbar-thumb{
        width: 20px;
        margin: 0 auto;
        background: transparent;
        transition: background .2s ease-in-out;;
        border-radius: 50px;
      }
      /* 滚动条未显示的部分 */
      &::-webkit-scrollbar-track-piece{
        background-color: transparent;
      }
      /* 滚动条的底 */
      &::-webkit-scrollbar-track{
        background-color: transparent;
      }
    }
  }
</style>