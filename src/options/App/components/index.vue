<!-- index主体 -->
<template>
  <div class="content">
    <div class="favorites">
      <Favorites @showBg="showBg" :imgurl="url"/>
    </div>
    <div class="cover">
      <div class="search">
        <el-row :gutter="24">
          <el-col :span="8">
            <Clock/>
          </el-col>
          <el-col :span="16">
            <Search/>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="24">
        <el-col :span="8">
          <News/>
        </el-col>
        <el-col :span="16">
          <UsefulWeb/>
          <ToDo/>
        </el-col>
      </el-row>
    </div>
    <div class="blackBg"></div>
  </div>
  <div class="bg" :style="{'backgroundImage': 'url('+url+')'}"></div>
</template>

<script lang='ts'>
import Cookie from "js-cookie";
import bingTodayImg from "../../../api/bingImg";
import { defineComponent, onMounted, provide, ref, } from 'vue'

import Favorites from "./Favorites/index.vue";
import News from "./News/index.vue";
import UsefulWeb from "./UsefulWeb/index.vue";
import ToDo from "./Todo/index.vue";
import Clock from "./Date/index.vue"
import Search from "./Search/index.vue";

import fadeFunc from "../../../util/baseAnima";

export default defineComponent({
  name: "index",
  components:{
    Favorites, 
    News, 
    UsefulWeb, 
    ToDo, 
    Clock, 
    Search, 
  },

  setup() {
    const blackBg = ref<HTMLElement | null>(null);
    const url = ref<string | undefined>(Cookie.get("dayImg"));
    // provide 用于提供数据
    provide("dayImg",url.value);
    // console.log($);
    onMounted(() => {
      const date = new Date().setHours(0,0,0,0);
      const d = Cookie.get("today");
      if(d === undefined || d !== date.toString()){
        Cookie.set("today", date.toString());
        url.value = undefined;
      }
      if(url.value === undefined){
        bingTodayImg().then(res=>{
          url.value = `https://cn.bing.com${res.data.images[0].url}`;
          const date = new Date();
          date.setTime(date.getTime() + (30 * 60 * 1000));
          Cookie.set("dayImg",url.value,{ expires: date });
        }).catch(err=>{
          console.error(err);
        })
      }
      blackBg.value = document.querySelector(".blackBg");
    })

    const showBg = (t: boolean)=>{
      console.log(t);
      if(blackBg.value !== null){
        if(t){
          fadeFunc.fadeShow(blackBg.value);
        }else{
          fadeFunc.fadeHide(blackBg.value);
        }
      }
    };
    return {
      url,
      showBg, 
    }
  }
});
</script>
<style lang="scss" scoped>
  .content{
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    padding: 16px 20px 16px 70px;
    transition: padding .5s ease-in-out;
    .favorites{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 5;
    }
    .cover{
      width: 100%;
      .search{
        width: 100%;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        // flex-wrap: nowrap;
      }
    }

    

  }
  .bg{
    transition: left .5s ease-in-out;
    position: absolute;
    z-index: -1;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .blackBg{
    width: 100%;height: 100%;
    position: absolute;
    top: 0;left: 0;
    background-color: rgba(0,0,0,.7);
    z-index: 3;
    display: none;
    opacity: 0;
  }
</style>